//script to inject into youtube
var testvar = 'hi';
console.log("hello world");

var k = setTimeout(realMain, 2000);
isGSPaused = true;


function realMain(){
//here goes the code to modify the play pause
//
//playing is = 1
//paused is = 2

function doWhat(statusNum){
 console.log(statusNum);
 if(!isGSPaused && statusNum == 1 ){
   rememberToPause();
   isGSPaused=true;
 }else if(isGSPaused && statusNum == 2){
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

 //       window.rememberToPause =
function rememberToPause(){
  chrome.extension.sendRequest({'command':'pauseShark'});
}

  //      window.rememberToPlay =
function rememberToPlay(){
  chrome.extension.sendRequest({'command':'resumeShark'});
}
//	window.test = 
function test(state){
	//alert(state+"this was a test");

}
 //       window.addlist = 
function addlist(){
  var movie = document.getElementById('movie_player');
  console.log(movie);
  movie.addEventListener("onStateChange", "youDidSomething");
  rememberToPause();
  console.log(movie.getDuration());
}

function main(){
  window.youDidSomething =  function(state){
	console.log('youDidSomething' + state);
	playing = document.getElementById('playing');
	playing.innerText= state; 
  }
}


addlist();

//var r = setTimeout('movie.addEventListener("onStateChange", "youDidSomething");', 6000);
//}
function getSt(){
playing = document.getElementById('playing');
  console.log('getSt: ' + playing.innerText);
  doWhat(parseInt(playing.innerText));
}



setInterval(getSt, 500);

var playStatus = document.createElement('div');
playStatus.id = "playing";
playStatus.innerText='lol';



(document.body || document.head || document.documentElement).appendChild(playStatus);


var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
}
