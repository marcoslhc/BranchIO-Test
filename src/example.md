# Branch io Example

```javascript
var addedShareMetatag = false;
      var addedAddToWishlistMetadata = false;
       function handleCodeShareButtonClicked() {
         branch.closeJourney(); //close a Journey that might be showing
         window.location.href = "https://rob-gioia-branch.github.io/ProgrammaticallyShowJourney.html?shared=true";
         branch.track('pageview'); //trigger a check to show the Journey if targeting is matched
       }

       function handleCodeAddButtonClicked() {
         branch.closeJourney(); //close a Journey that might be showing
         window.location.href = "https://rob-gioia-branch.github.io/ProgrammaticallyShowJourney.html?added_to_wishlist=true";
         branch.track('pageview'); //trigger a check to show the Journey if targeting is matched
       }

      function handleTagsShareButtonClicked() {
         removeExistingBranchMetatags();
         
         if(!addedShareMetatag) {
           branch.closeJourney(); //close a Journey that might be showing
           var meta = document.createElement('meta');
           meta.name = "branch:deeplink:shared";
           meta.content = "true";
           document.getElementsByTagName('head')[0].appendChild(meta);
           addedShareMetatag=true;
           setTimeout(function(){
             branch.track('pageview'); //trigger a check to show the Journey if targeting is matched
           }, 500);
        }
       }

       function handleTagsAddButtonClicked() {
         removeExistingBranchMetatags();
         
         if(!addedAddToWishlistMetadata) {
           branch.closeJourney(); //close a Journey that might be showing
           var meta = document.createElement('meta');
           meta.name = "branch:deeplink:added_to_wishlist";
           meta.content = "true";
           document.getElementsByTagName('head')[0].appendChild(meta);
           addedAddToWishlistMetadata=true;
           setTimeout(function(){
             branch.track('pageview'); //trigger a check to show the Journey if targeting is matched
           }, 500);
         }
       }

      function removeExistingBranchMetatags() {
        if(addedAddToWishlistMetadata) {
           document.querySelector("[name='branch:deeplink:added_to_wishlist']").remove()
          addedAddToWishlistMetadata = false;
         }

        if(addedShareMetatag) {
           document.querySelector("[name='branch:deeplink:shared']").remove()
          addedShareMetatag = false;
         }
      }
```

## Whole HTML
```html
<!DOCTYPE html>
<html> 
  <head>
    <script>
     // load Branch
     (function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src="https://cdn.branch.io/branch-latest.min.js";k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener banner closeBanner closeJourney data deepview deepviewCta first init link logout removeListener setBranchViewData setIdentity track trackCommerceEvent logEvent disableTracking getBrowserFingerprintId crossPlatformIds lastAttributedTouchData setAPIResponseCallback qrCode".split(" "), 0);
     // init Branch
     branch.init('key_live_mbErCMtrzeheAWS0Xagg7hjbwDkaZ6SP');
    </script>
  </head>
  <body>
     <h1> Programmatically displaying the Journey </h1>
       <button id="code-button-share" type="button" onclick="handleCodeShareButtonClicked()">Share</button> 
       <button id="code-button-add" type="button" onclick="handleCodeAddButtonClicked()">Add to Wishlist</button> 
     <h1> Using Meta Tags </h1>
       <button id="tags-button-share" type="button" onclick="handleTagsShareButtonClicked()">Share</button> 
       <button id="tags-button-add" type="button" onclick="handleTagsAddButtonClicked()">Add to Wishlist</button> 
    <script>
      var addedShareMetatag = false;
      var addedAddToWishlistMetadata = false;
       function handleCodeShareButtonClicked() {
         branch.closeJourney(); //close a Journey that might be showing
         window.location.href = "https://rob-gioia-branch.github.io/ProgrammaticallyShowJourney.html?shared=true";
         branch.track('pageview'); //trigger a check to show the Journey if targeting is matched
       }

       function handleCodeAddButtonClicked() {
         branch.closeJourney(); //close a Journey that might be showing
         window.location.href = "https://rob-gioia-branch.github.io/ProgrammaticallyShowJourney.html?added_to_wishlist=true";
         branch.track('pageview'); //trigger a check to show the Journey if targeting is matched
       }

      function handleTagsShareButtonClicked() {
         removeExistingBranchMetatags();
         
         if(!addedShareMetatag) {
           branch.closeJourney(); //close a Journey that might be showing
           var meta = document.createElement('meta');
           meta.name = "branch:deeplink:shared";
           meta.content = "true";
           document.getElementsByTagName('head')[0].appendChild(meta);
           addedShareMetatag=true;
           setTimeout(function(){
             branch.track('pageview'); //trigger a check to show the Journey if targeting is matched
           }, 500);
        }
       }

       function handleTagsAddButtonClicked() {
         removeExistingBranchMetatags();
         
         if(!addedAddToWishlistMetadata) {
           branch.closeJourney(); //close a Journey that might be showing
           var meta = document.createElement('meta');
           meta.name = "branch:deeplink:added_to_wishlist";
           meta.content = "true";
           document.getElementsByTagName('head')[0].appendChild(meta);
           addedAddToWishlistMetadata=true;
           setTimeout(function(){
             branch.track('pageview'); //trigger a check to show the Journey if targeting is matched
           }, 500);
         }
       }

      function removeExistingBranchMetatags() {
        if(addedAddToWishlistMetadata) {
           document.querySelector("[name='branch:deeplink:added_to_wishlist']").remove()
          addedAddToWishlistMetadata = false;
         }

        if(addedShareMetatag) {
           document.querySelector("[name='branch:deeplink:shared']").remove()
          addedShareMetatag = false;
         }
      }
    </script>
  </body>
</html>

```