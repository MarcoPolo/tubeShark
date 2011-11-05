function savetime(){
    var select = document.getElementById("timeDelay");
    var timeDelay = select.children[select.selectedIndex].value;
    localStorage["timeDelay"] = timeDelay
    chrome.extension.sendRequest({'command':'timeDelayChanged'});
}

function restore_options() {
    var timeDelay = localStorage["timeDelay"];

    if (!timeDelay) {
        return;
    }

    var select = document.getElementById("timeDelay");
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        if (child.value == timeDelay) {
            child.selected = "true";
            break;
        }
    }
}
