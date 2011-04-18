inject(play);
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
