console.log("it lives LOL");
tabs = 1;
gsUrl = "grooveshark.com";
gsTab=0;
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
				if (request.gsTab == 'findMePlz'){
					console.log('finding the shark, plz hold')
					intervalId=setInterval(findId, 100);
						//findId();
				}

				if (request.gsTab == 'findActive'){
                    gsTab = sender.tab.id;
                    console.log('Active GS is ', gsTab);
                }
				if (gsTab==0){
				   console.log('GS has not been opened');
				}
				if (request.command == "resumeShark"){
		        chrome.tabs.sendRequest(gsTab, {command: "resumeShark"});
		        sendResponse({});
		        }else if ( request.command == "pauseShark"){
		        chrome.tabs.sendRequest(gsTab, {command: "pauseShark"});
				sendResponse({});
				}else{
		        sendResponse({}); // snub them.
				console.log(request);
				}
		});
