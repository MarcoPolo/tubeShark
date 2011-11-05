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
    GS.player.resumeSong();
}
function pause(){
    //console.log("tubeShark pausing!");
    GS.player.pauseSong();

}

function inject(content){
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ content +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);
}

function main(){
    console.log('well hello there!',localStorage["timeDelay"]);

    //inject the listener to follow the GS play/pause activity
    inject(addGSListener);
	
}

function recRequest(request, sender, sendResponse){
    //This is to receive request from the extension, and then inject commands
	if(request.command =="resumeShark"){
        setTimeout("inject(play)",request.timeDelay);
	}
	if(request.command == "pauseShark"){
        inject(pause);
		//inject(pause);
	}
}

function addGSListener(){

    playStatus = GS.player.isPlaying;
    var playingEv = document.createEvent("Events");
    var pausingEv = document.createEvent("Events");
    pausingEv.initEvent("paused",true,false); 
    playingEv.initEvent("playing",true,false); 

    $('#player_play_pause').click(function(){
        //This is tricky becuase at the time this is checked the isPlaying is still on the last state so we have to flip to logic
        !GS.player.isPlaying ? document.dispatchEvent(playingEv) : document.dispatchEvent(pausingEv);
    });
}

//This function tells the extension to look for this GS tab by sending a request
function findActiveGS(){
    chrome.extension.sendRequest({'gsTab':'findActive'});
}

//This function is used to tell the extension that GS was manually paused
function tellbgGSPaused(){
    chrome.extension.sendRequest({'gsTab':'GSisPaused'});
}

//function to specify a time delay 
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
setTimeout(main, 4000)
