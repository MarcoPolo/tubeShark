console.log("it lives LOL");
tabs = 1;
gsUrl = "grooveshark.com";
gsTab=0;
isGSPaused = true;
currentTab = 0;


function releaseTheShark(){
    chrome.tabs.executeScript(gsTab, {'file':'js/injectShark.js'});
}
function findId(){
    chrome.tabs.getAllInWindow(this.tab, function(tabso){console.log(tabso);tabs=tabso;});

    for(i in tabs){
        if(tabs[i].url.indexOf(gsUrl)!=-1){
            console.log('the GS tab is ' + tabs[i].id);
            gsTab=tabs[i].id;
            //this.gsTab=tabs[i].id;
            }
        }

        if(gsTab!=0) console.log('the shark has been found');
        else console.log('no such luck, sorry bud');

        if(gsTab!=0) clearInterval(intervalId);
}


chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url + ' and the tab info is ' + sender.tab :
            "from the extension");
            console.log('sender tab id is ', sender.tab.id);
            currentTab=sender.tab.id;

            switch (request.gsTab){
                case 'findMePlz':
					console.log('finding the shark, plz hold')
					intervalId=setInterval(findId, 100);
                    break;
                case 'findActive':
                    gsTab = sender.tab.id;
                    //clear the isGSPaused boolean
                    if(currentTab == gsTab){
                        isGSPaused = false;
                    }
                    console.log('Active GS is ', gsTab);
                    break;
                case 'isGSPaused':
                    //if the sender of the request and the
                    if(currentTab == gsTab){
                        isGSPaused = true;
                    }
                    break;
                case 'getTimeDelay':
                    sendResponse({timeDelay:localStorage['timeDelay']});
                    break;
            }
            switch (request.command){
                case 'resumeShark':
                        chrome.tabs.sendRequest(gsTab, {command: "resumeShark"});
                        sendResponse({});
                    break;
                case 'pauseShark':
                    chrome.tabs.sendRequest(gsTab, {command: "pauseShark"});
                    sendResponse({});
                    break;
                default:
                    sendResponse({}); // snub them.
                    break;
        }
    }
);
