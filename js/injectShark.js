//script that injects into grooveshark
function play(){
    console.log("tubeShark resuming!");
    GS.player.resumeSong();
}
function pause(){
    console.log("tubeShark pausing!");
    GS.player.pauseSong();
}



function inject(main){
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ main +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);
}

function main(){
    inject(play);
	console.log('it lives');

}
chrome.extension.onRequest.addListener(
		  function(request, sender, sendResponse) {
		      console.log(sender.tab ?
			                      "from a content script:" + sender.tab.url :
					                      "from the extension");
		      if (request.command == "resumeShark"){
                        inject(play);
		        sendResponse({});
		      }
                      else if ( request.command == "pauseShark"){
		        inject(pause);
			sendResponse({});
		      }
		      else
		        sendResponse({}); // snub them.
		    });
console.log('O hai There!');
var t = setTimeout(main, 1000);
