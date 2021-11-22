document.getElementsByClassName('undo')[0].addEventListener('click', undo);
document.getElementsByClassName('redo')[0].addEventListener('click', redo);

let positionHistory = [];
let positionRoutesHistory = [];
let innerHTMLHistory = [];
let historyIndex = 0;


positionHistory[0] = position;
positionRoutesHistory[0] = positionRoutes.slice(0);
innerHTMLHistory[0] = document.getElementsByClassName(`expression`)[0].innerHTML;

function undo() {
    if ( historyIndex !== 0) {
        historyIndex--;
        position = positionHistory[historyIndex];
        positionRoutes = positionRoutesHistory[historyIndex].slice(0);
        document.getElementsByClassName(`expression`)[0].innerHTML = innerHTMLHistory[historyIndex];
        assignNewValues();
    }
}


function redo() {
    if ( historyIndex <= positionHistory.length -2 ) {
        historyIndex++;
        position = positionHistory[historyIndex];
        positionRoutes = positionRoutesHistory[historyIndex].slice(0);
        document.getElementsByClassName(`expression`)[0].innerHTML = innerHTMLHistory[historyIndex];
        assignNewValues();
    }
}



function saveHistory() {
    historyIndex++;
    positionHistory.length = historyIndex;
    positionRoutesHistory.length = historyIndex;
    innerHTMLHistory.length = historyIndex;
    positionHistory[historyIndex] = position;

    // A advanced copying script was needed because normal variable assigning is only making a reference
    // to a object, not a copy of it. 
    positionRoutesHistory.push(JSON.parse(JSON.stringify(positionRoutes))); 
    innerHTMLHistory[historyIndex] = document.getElementsByClassName(`expression`)[0].innerHTML;
}

