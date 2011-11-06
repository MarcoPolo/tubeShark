//script to inject into youtube
setTimeout(waitforit, 2000); //wait for youtube to load

RESUME = 1;
PAUSE = 2;

function waitforit(){
    //Modify play and pause

    function doWhat(statusNum){
        //console.log(statusNum);

        switch (statusNum){
            case RESUME:
            case 5:
            case 0:
            case 3:
                rememberToPause();
                break;
            case PAUSE:
            case 0:
                rememberToPlay();
                break;
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
        movie.addEventListener("onStateChange", "youDidSomething");
        //lets pause GS as the video begins
        rememberToPause();
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
        window.addEventListener("pauseShark", function(){
            rememberToPause();
        }, false, true);

        window.addEventListener("resumeShark", function(){
            console.log('playing Grooveshark');
            rememberToPlay();
        }, false, true);
    }

    addlist();
    listenForChange();
    inject(main);
}
