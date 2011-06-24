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
	console.log('it lives');
	//this is here so that the background page can find grooveshark when it has loaded
	chrome.extension.sendRequest({'gsTab':'findMePlz'});
    inject(addGSListener);
	
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

function addGSListener(){
    playStatus = GS.player.isPlaying;
    var playingEv = document.createEvent("Events");
    var pausingEv = document.createEvent("Events");
    pausingEv.initEvent("paused",true,false); 
    playingEv.initEvent("playing",true,false); 
    $.subscribe("gs.player.playstatus", function(){ 
        if (GS.player.isPlaying != playStatus) {
            playStatus = GS.player.isPlaying;
            playStatus ? document.dispatchEvent(playingEv) : document.dispatchEvent(pausingEv);
        }
    });
}

//This function finds the active GS window
function findActiveGS(){
    chrome.extension.sendRequest({'gsTab':'findActive'});
}

window.addEventListener("playing", function(){console.log('playing'); findActiveGS();}, false, true);
window.addEventListener("paused", function(){console.log('paused');}, false, true);

chrome.extension.onRequest.addListener(recRequest);

console.log('O hai There!');
var t = setTimeout(main, 4000)
