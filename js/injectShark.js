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
	console.log(this.tabs);
	console.log(this.tab);
	console.log(this);
	//this is here so that the background page can find grooveshark when it has loaded
	chrome.extension.sendRequest({'gsTab':'findMePlz'});
	
}

function recRequest(request, sender, sendResponse){
	console.log(request.command);
	if(request.command =="resumeShark"){
		inject(play);
	}
	if(request.command == "pauseShark"){
		inject(pause);
	}
}



chrome.extension.onRequest.addListener(recRequest);

console.log('O hai There!');
var t = setTimeout(main, 4000);
