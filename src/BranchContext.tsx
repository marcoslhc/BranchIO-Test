import React, { useContext, createContext, useEffect } from "react";
import { Helmet } from "react-helmet";


const BranchContext = createContext<{
    tags: TagRegistry;
    branchio: typeof globalThis.branch;
} | null>(null);

const BranchProxy = new Proxy(globalThis.branch, {
    get(t, k, receiver) {
        switch (typeof t[k]) {
            case 'function': { 
                const old = t[k].bind(t)
                const newFn = function (...args: unknown[]) {
                    console.group("branch.io proxy");
                    console.log(`function call: "${String(k)}"`, ...args);
                    const res = old(...args);
                    console.groupEnd();
                    return res;
                }
                return newFn;
            }
            default:
                return t[k];
        }
    }
});

enum TagTypes {
    event = 'event',
    description = 'description',
    liquidtag = 'liquidtag'
}

type TagType = keyof typeof TagTypes;

class TagMap {
    map: Map<string, string>;
    constructor() {
        this.map = new Map<string, string>()
    }
    add(name: string, content: string) {
        if (this.map.has(name)) {
            const currentContent = this.map.get(name);
            console.warn(`Tag "${name}" already exists with value: ${currentContent}, overwriting...`);
            this.map.delete(name);
        }
        this.map.set(name,content);
    }
    remove(name: string) {
        return this.map.delete(name);
    }

    get(name: string) {
        return this.map.get(name);
    }
}

class TagRegistry {
    map: Map<TagType, TagMap>;
    
    constructor() {
        this.map = new Map<TagType, TagMap>();
        this.map.set(TagTypes.event, new TagMap());
        this.map.set(TagTypes.description,new TagMap());
        this.map.set(TagTypes.liquidtag, new TagMap());
    }

    get events(){
        return this.map.get(TagTypes.event)!;
    }

    get descriptions() {
        return this.map.get(TagTypes.description)!;
    }

    get liquidtags() {
        return this.map.get(TagTypes.liquidtag)!;
    }

    add(type: TagType, name: string, content: string) {
        const map = this.map.get(type)!;
        map.add(name,content);
    }

    remove(type: TagType, name: string) {
        const map = this.map.get(type)!;

        return map.remove(name);
    }

    get(type: TagType, name: string) {
        const map = this.map.get(type)!;

        return map.get(name);
    }
}


export const BranchProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [tags, _tags] = React.useState(new TagRegistry());
    const [branchio, _branchio] = React.useState(BranchProxy);
    return (
        <BranchContext.Provider value={{tags, branchio}}>
            {children}
        </BranchContext.Provider>
    );
}

export const useBranchContext = () => {
    const context = useContext(BranchContext);
    if (context === null) {
        throw new Error('useBranchContext must be used within a BranchProvider');
    }
    return context;
}

export function MetaTag({
    tagname,
    type,
    value,
    prefix = []
}: {
    tagname: string,
    type: 'event' | 'description' | 'liquidtag',
    value: string,
    prefix: string[]
}) {
    const metatagAdded = React.useRef(false);
    const {branchio, tags} = useBranchContext();
    const [insertMetatag, setInsertMetatag] = React.useState(false);

    useEffect(() => {
        if (metatagAdded.current == false) {
            branchio.closeJourney();
            tags.add(type, tagname, value);
            setInsertMetatag(true);
        }
        return () => {
            setTimeout(() => {
                branchio.track('pageview')
            }, 0);
        }
    }, [])
    return (
        <Helmet>
            {insertMetatag && <meta name={prefix.concat(tagname).join(":")} content={value} />}
        </Helmet>
    );
}

export function BranchEventMetaTag({name, value}:  {name: string, value: string}) {
    return <MetaTag type={TagTypes.event} tagname={name} value={value} prefix={["branch", "deeplink"]}/>
}