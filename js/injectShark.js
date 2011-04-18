//script that injects into grooveshark
function play(){
    console.log("lol");
    GS.player.resumeSong();
}



function inject(main){
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ main +')();'));
    (document.body || document.head || document.documentElement).appendChild(script);
}

function main(){
    inject(play);
}
console.log('lol2');
alert('test2');
var t = setTimeout(main, 3000);
