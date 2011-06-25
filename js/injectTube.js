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
            if (state == 2){ 
                var resumeShark = document.createEvent("Events");
                resumeShark.initEvent("resumeShark",true,false); 
                document.dispatchEvent(resumeShark);
            }
            if (state == 1){
                var pauseShark = document.createEvent("Events");
                pauseShark.initEvent("pauseShark",true,false);
                document.dispatchEvent(pauseShark);
            }
        }

        window.onunload = function(){
            var resumeShark = document.createEvent("Events");
            resumeShark.initEvent("resumeShark",true,false); 
            document.dispatchEvent(resumeShark);
        }
        
    }

    //this gets the element status (status describes whether the video is playing) within the page
    function getSt(){
        playing = document.getElementById('playing');
        doWhat(parseInt(playing.innerText));
    }

    function inject(main){
        var script = document.createElement('script');
        script.appendChild(document.createTextNode('('+ main +')();'));
        (document.body || document.head || document.documentElement).appendChild(script);
    }

    function listenForChange(){
        window.addEventListener("pauseShark", function(){console.log('pausing Grooveshark'); rememberToPause();}, false, true);
        window.addEventListener("resumeShark", function(){console.log('playing Grooveshark'); rememberToPlay();}, false, true);
    }

    addlist();
    listenForChange();
    inject(main);

}
