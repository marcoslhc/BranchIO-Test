import { useCallback, useEffect, useState } from 'react';

import './Button.css';
import React from 'react';
import { BranchEventMetaTag } from './BranchContext';


const BRANCH_METATAG_NAME_PREFIX = "branch:deeplink:"

// function getAllBranchMetadataTags() {
//     return globalThis.document.querySelectorAll('meta[name^="branch:deeplink:');
// }

// function removeAllBranchMetadataTags() {
//     const tags = getAllBranchMetadataTags();
//     for (let tag of tags) {
//         tag.remove();
//     }
// }

// function createMetatag(name: string, value: any): HTMLMetaElement {
//     const tag = globalThis.document.createElement('meta');
//     tag.setAttribute("name", name);
//     tag.setAttribute("content", value);
//     return tag;
// }

// function createBranchMetatag(name: string, value: any): ReturnType<typeof createAndAddMetatag> {
//     return createMetatag(`${BRANCH_METATAG_NAME_PREFIX}${name}`, value);
// }

// function addMetatag(tag?: HTMLMetaElement): HTMLMetaElement | undefined {
//     if (!tag) {
//         console.error("No tag defined, No op");
//         return;
//     };
//     console.log(tag);
//     const head = globalThis.document.querySelector('head')
//     console.log(head);
//     head?.appendChild(tag);
//     console.log(head)
// }

// function createAndAddMetatag(name: string, value: any): ReturnType<typeof addMetatag> {
//     return addMetatag(createBranchMetatag(name, value));
// }


const Button: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = useCallback(() => {
        setClicked(current => !current)
    }, [setClicked])

    return (
        <button onClick={handleClick}>
            {clicked && <BranchEventMetaTag name="loggedin" value="true" />}
        {children}
        </button>
    )
}

export default Button