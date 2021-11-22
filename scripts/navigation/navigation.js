let x = 1;
let position = '0][0][1';
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

let activeDivNumber;
let activeDiv;
assignNewValues();

let cursorNode = document.createElement('span');
cursorNode.textContent = "|";
cursorNode.setAttribute('class', 'cursor');

setTimeout(() => {
    document.getElementById('1.1').setAttribute("onclick", `mouseNavigation(1.1)`);
    document.getElementById('1.1').setAttribute("onmouseover", `customHover(1.1, event)`);
    document.getElementById('1.1').setAttribute("onmouseout", `clearBackground(1.1)`);
}, 100);


function navigation(button) { 
    if ( activeDiv.classList.contains('cursor')) { // If cursor is active -> hide it
        activeDiv.classList.remove("cursor");
        activeDiv.innerHTML = '';
    }

    activeDiv.style.backgroundColor = 'transparent';

    switch (button) {
        case ('arrowLeft'):
            if (checkIfMoveIsPossible(-2)) {
                position = goSideways(-2, position);
            } else if (deleteLastLevel(position) !== `0][0`){
                jumpToTheRight(-2);
            }
            checkIfNumber(-2);
            break;

        case ('arrowRight'):
            if(checkIfMoveIsPossible(2)){
                position = goSideways(2, position);
            } else if (deleteLastLevel(position) !== `0][0`) {
                jumpToTheRight(2);
            }

            checkIfNumber(2);
            break;

        case ('arrowUp'):
            if ( !activeDiv.className.includes('whitespace')){ // Can't go up if selected div is a cursor
                const checkedPosition = enterVertically(position);
                if (eval(`positionRoutes[${checkedPosition}]`) !== undefined) {
                    position = checkedPosition;
                }
            }
            break;

        case ('arrowDown'):
            if ( !activeDiv.parentNode.classList.contains('mainX') ) { // Can't go higher than mainX
                position = deleteLastLevel(position);
                position = goSideways(1, position);
            }
            break;
    }
    assignNewValues();

    // Omit need to double click when entering a x or y value
    if (activeDiv.className == `bra` && button == 'arrowUp' && parentIsXorY()) {
        navigation(`arrowUp`);
    }

    // Omit need to press arrow down two times when leaving a x or y value
    if (activeDiv.className == 'bra' && button == 'arrowDown' && parentIsXorY()) {
        if (!activeDiv.parentNode.classList.contains('mainX')) { // Can't go higher than mainX
            position = deleteLastLevel(position);
            position = goSideways(1, position);
        }
        activeDiv.style.backgroundColor = 'transparent';
        assignNewValues();
    }
}

function jumpToTheRight(direction) {
    let jumpPosition = position;
    do {
        jumpPosition = deleteLastLevel(jumpPosition);
        jumpPosition = goSideways(direction + 1, jumpPosition);
    } while (eval(`positionRoutes[${jumpPosition}]`) == undefined);
    position = jumpPosition;
}

function checkIfNumber(direction) { // Prevents number itself being selected as active element
    const checkPosition = goSideways(- 1, position);
    if ( eval(`positionRoutes[${checkPosition}]`) == "num" ){
        position = goSideways(direction, position);
    }
}

function assignNewValues() {
    activeDivNumber = eval(`positionRoutes[${position}]`);
    activeDivNumber = String(activeDivNumber);
    activeDiv = document.getElementById(activeDivNumber);
    if (activeDivNumber.charAt(activeDivNumber.length - 2) == '.') { // Check if selected div is a cursor - if it is enable cursor
        activeDiv.classList.add("cursor");
        activeDiv.innerHTML = '|';
    } else {
        activeDiv.style.backgroundColor = activeExpressionBg;
    }
}

function checkIfMoveIsPossible(direction){ // Says for itself doesn't it
    const checkedPosition = goSideways(direction, position);
    const checkedId = eval(`positionRoutes[${checkedPosition}]`);

    if (checkedId !== undefined) {
        return true;
    } else {
        return false;
    }
}

function parentIsXorY() {
    return activeDiv.parentNode.className == 'x' || activeDiv.parentNode.className == 'y';
}

function activeIsXorY() {
    return activeDiv.className == 'x' || activeDiv.className == 'y';
}