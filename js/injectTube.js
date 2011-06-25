//script to inject into youtube
var k = setTimeout(realMain, 2000);
isGSPaused = true;

RESUME = 1;
PAUSE = 2;

function realMain(){
    //Modify play and pause

    function doWhat(statusNum){
        //console.log(statusNum);

        if(!isGSPaused && statusNum == RESUME ){
            rememberToPause();
            isGSPaused=true;
        }else if(isGSPaused && statusNum == PAUSE){
            rememberToPlay();
            isGSPaused=false;
        }else if(!isGSPaused && statusNum == 5){
            rememberToPause();
            isGSPaused=true;
        }else if(isGSPaused && statusNum == 0){
            rememberToPlay();
            isGSPaused=false;
        }else if(!isGSPaused && statusNum == 3){
            rememberToPause();
            isGSPaused=true;
        }else{
        }
    }

    function rememberToPause(){
        chrome.extension.sendRequest({'command':'pauseShark'});
    }

    function rememberToPlay(){
        chrome.extension.sendRequest({'command':'resumeShark'});
    }

    function addlist(){
        var movie = document.getElementById('movie_player');
        //console.log(movie);
        movie.addEventListener("onStateChange", "youDidSomething");
        rememberToPause();
        //console.log(movie.getDuration());
    }

    function main(){
        window.youDidSomething = function(state){
            //console.log('youDidSomething' + state);
            playing = document.getElementById('playing');
            playing.innerText= state; 
            :
        }
    }

    //this gets the element status (status describes whether the video is playing) within the page
    function getSt(){
        playing = document.getElementById('playing');
        //console.log('getSt: ' + playing.innerText);
        doWhat(parseInt(playing.innerText));
    }

    addlist();
    setInterval(getSt, 500);

    var playStatus = document.createElement('div');
    playStatus.id = "playing";
    playStatus.innerText='lol';



    (document.body || document.head || document.documentElement).appendChild(playStatus);


    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ main +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);
}
