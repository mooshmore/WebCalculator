let deleteCheck = [];
let deleteCheckId = 0;
let mouseHeld;

document.getElementsByClassName('backspace')[0].addEventListener('mousedown', () => { // Activated after holding delete button for at least 0.5s
    deleteCheck[deleteCheckId] = true;
    mouseHeld = setTimeout(() => {
        if ( deleteCheck[deleteCheckId] == true){
            pressAnimation();
            restoreToBasic();
            const deleteButton = document.getElementsByClassName("box")[20];
            // Prevent button press animation triggering a second time after the user unclicks the delete button
            deleteButton.removeEventListener("click", pressAnimation);
            setTimeout(() => {
                deleteButton.addEventListener("click", pressAnimation);
            }, 1000);
        }
    }, 500);
});

document.getElementsByClassName('backspace')[0].addEventListener("mouseup", () => { // Used to properly run function above
    clearTimeout(mouseHeld);
    deleteCheck[deleteCheckId] = false;
    deleteCheckId++;
});

function restoreToBasic() {
    document.getElementsByClassName('operation')[0].style.opacity = 0;
    document.getElementsByClassName('operation')[0].innerHTML = ``;
    document.getElementById('1').innerHTML = `<span class="whitespace" id="1.1" onclick="mouseNavigation(1)" onmouseover="customHover(1, event)" onmouseout="clearBackground(1)">
                        </span>`; 
    x = 1;
    positionRoutes = [
        [
            [
                'blank',
                1.1  
            ],
            1
        ],
        0
    ];
    position = '0][0][1';
    assignNewValues();
}

function deleteValues(mode) {
        // console.log(activeDiv.parentNode.childElementCount == 1);
        // console.log(activeDiv.parentNode.className !== 'x mainX');
        // console.log(activeDiv.parentNode.parentNode.parentNode.childElementCount !== 1);

    if (activeDiv.parentNode.parentNode.className == 'bra' && // Allows deleting brackets while being inside of them.
        activeDiv.parentNode.childElementCount == 1 && 
        activeDiv.parentNode.className !== 'x mainX' && 
        activeDiv.parentNode.parentNode.parentNode.childElementCount !== 1
    ) {
        position = deleteLastLevel(position);
        position = goSideways(3, position);
        assignNewValues();
        deleteValues(`backspace`);
        return;
    }

    if (activeIsXorY() && activeDiv.innerHTML !== '◻') { // Clearing x / y elements while position is x/y
        activeDiv.innerHTML = '◻';
        eval(`positionRoutes[${goSideways(-1, position)}] = []`);
    } else if (activeDiv.className == 'bra' && parentIsXorY()) { // Clearing x / y elements while position is bra
        position = deleteLastLevel(position);
        position = goSideways(1, position);
        assignNewValues();
        activeDiv.innerHTML = '◻';
        eval(`positionRoutes[${goSideways(-1, position)}] = []`);
    } else if (activeDiv.parentNode.childElementCount <= 1 || activeDiv.innerHTML == "◻") { // Return if there is nothing to delete
        return;
    }

    if ( mode == 'backspace' && getPositionsLastValue(position) == 1){ // Backspace won't do anything if cursor is at the beginning
        return;
    }

    if (mode == 'del' && (getLength(position, 'positionRoutes') == getPositionsLastValue(position) + 1)) { // Del won't do anything if cursor is at the end
        return;
    }


    if ( activeDiv.className.includes('whitespace') ) {
        switch (mode) {
            case 'backspace':
                deleteWhitespace(0);
                deleteDiv(-2);
                removeIdInPositionRoutes(-4, 1, 4);
                position = goSideways(-4, position);          
                assignNewValues();
                break;

            case 'del': 
                deleteWhitespace(4);
                deleteDiv(2);
                removeIdInPositionRoutes(0, 1, 4);
                assignNewValues();
                break;
        }
    } else if (allOperations.includes(activeDiv.className)) { // Deleting selected element
        deleteWhitespace(2);
        activeDiv.remove();
        removeIdInPositionRoutes(0, -1, 4);
        position = goSideways(-2, position);
        assignNewValues();
    }

    if (activeDiv.parentNode.childElementCount <= 1 && activeDiv.parentNode.className !== 'x mainX' && activeDiv.parentNode.parentNode.parentNode.parentNode.className !== 'bra') { // Restore default looks if x/y value has been emptied
        activeDiv.parentNode.parentNode.parentNode.innerHTML = '';
        position = deleteLastLevel(position);
        position = deleteLastLevel(position);
        eval(`positionRoutes[${position}] = []`);
        position = goSideways(1, position);
        assignNewValues();
        activeDiv.innerHTML = '◻';
        return;
    }
    checkScrollbar();
}

function deleteWhitespace(direction) {  // Deletes whitespace belonging to deleted element
    const deletedWhitespacePosition = goSideways(direction, position);
    const deletedWhitespaceId = eval(`positionRoutes[${deletedWhitespacePosition}]`);
    const deletedWhitespace = document.getElementById(deletedWhitespaceId);
    deletedWhitespace.remove();
}

function deleteDiv(direction){   // Deletes Element
    const deletedDivPosition = goSideways(direction, position);
    const deletedDivId = eval(`positionRoutes[${deletedDivPosition}]`);
    const deletedDiv = document.getElementById(deletedDivId);
    deletedDiv.remove();
}

function removeIdInPositionRoutes(direction, arrayPos1, arrayPos2) {
    let tempDeletingPosition = deleteLastLevel(position);
    const tempDeletingArray = eval(`positionRoutes[${tempDeletingPosition}]`); // Remember that this is a reference, not a copy
    tempDeletingPosition = goSideways(direction, position);
    tempDeletingPosition = getPositionsLastValue(tempDeletingPosition);
    tempDeletingArray.splice(tempDeletingPosition + arrayPos1, arrayPos2);
}

