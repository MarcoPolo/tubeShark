gsTab=0;
isGSPaused = true;
currentTab = 0;

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url + ' and the tab info is ' + sender.tab :
            "from the extension");
            console.log('sender tab id is ', sender.tab.id);
            currentTab=sender.tab.id;

            switch (request.gsTab){
                case 'findActive':
                    gsTab = sender.tab.id;
                    //clear the isGSPaused
                    isGSPaused = false;
                    console.log('Active GS is ', gsTab);
                    break;
                case 'GSisPaused':
                    //if the sender of the request and the
                    if(sender.tab.id == gsTab){
                        isGSPaused = true;
                    }
                    break;
            }
            switch (request.command){
                case 'resumeShark':
                    console.log('see in GS is paused',isGSPaused);
                    if (!isGSPaused){
                        chrome.tabs.sendRequest(gsTab, {command: "resumeShark"});
                        sendResponse({});
                    }
                    break;
                case 'pauseShark':
                    chrome.tabs.sendRequest(gsTab, {command: "pauseShark"});
                    sendResponse({});
                    break;
                default:
                    sendResponse({}); // snub 'em.
                    break;
        }
    }
);
