//script that injects into grooveshark


//--------------- Experimental
//Experimental function to create a fading effect. 
//Will probably not get implemented because chrome slows down js intervals in background tabs to 1s
function fadingStuff(){

    GS.player.fadeIn=fadeIn;
    GS.player.fadeOut=fadeOut;
    GS.player.fadeVol=fadeVol; 

    fadeObj = {
          'fadeOut':fadeOut
        , 'fadeIn':fadeIn
        , 'fadeVol':fadeVol
    }

    intvl = 100/8;

    function fadeVol(start, end, fadeIn){
        //if it is fading in the end volume is going to be bigger than the start
        //console.log('start',start,'end',end);       
        if (start == end){
            if(!fadeIn){
                GS.player.pauseSong();
                GS.player.setVolume(100);
            }
        }else{
            fadeIn ? start+=intvl : start-=intvl;
            setTimeout("GS.player.fadeVol("+start+", "+end+","+ fadeIn+")",50);
            GS.player.setVolume(start);
        }
    }

    function fadeOut(){
        start = 100;
        end = 0;
        fadeVol(start, end, false);
    }
    function fadeIn(){
        start = 0;
        end = 100;
        GS.player.resumeSong();
        fadeVol(start, end, true);
    }
    return fadeObj;
}
// ----------- End of Experimental Feature

function play(){
    //console.log("tubeShark resuming!");
    //GS.player.fadeIn();
    GS.player.resumeSong();
}
function pause(){
    //console.log("tubeShark pausing!");
    //GS.player.fadeOut();
    GS.player.pauseSong();

}

function inject(content){
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ content +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);
}

function main(){
	//this is here so that the background page can find grooveshark when it has loaded
    console.log('well hello there!',localStorage["timeDelay"]);

    //inject is mean to inject script content into the page
    inject(addGSListener);
    //inject(fadingStuff);
	
}

function recRequest(request, sender, sendResponse){
	//console.log(request.command);
    //This is to receive request from the extension, and then inject commands
	if(request.command =="resumeShark"){
		inject(play);
        //console.log('this is from the request telling you to play!');
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

function tellbgGSPaused(){
    chrome.extension.sendRequest({'gsTab':'GSisPaused'});
}

function findTimeDelay(){
    chrome.extension.sendRequest({'gsTab':'getTimeDelay'});
    console.log(response.data);
}

window.addEventListener("playing", function(){
    //console.log('playing'); 
    findActiveGS();
}, false, true);
window.addEventListener("paused", function(){
    //console.log('paused');
    tellbgGSPaused();
}, false, true);

chrome.extension.onRequest.addListener(recRequest);
console.log("               __\n              / *_) < LOL Tubeshark\n     _.----._/ /\n    /         /\n __/ (  | (  |\n/__.-'|_|--|_|\n");
var t = setTimeout(main, 4000)
