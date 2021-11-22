document.getElementById('1.1').addEventListener("click", () => mouseNavigation(1.1));

function mouseNavigation(id) {
    if (activeDiv.classList.contains('cursor')) { // If cursor is active -> hide it
        activeDiv.classList.remove("cursor");
        activeDiv.innerHTML = '';
    }
    activeDiv.style.backgroundColor = 'transparent';

    searchedIndex = -1;
    position = findPosition(id, '0][0');
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


// Code from https://stackoverflow.com/questions/15685708/determining-if-mouse-click-happened-in-left-or-right-half-of-div 
// bersling's answer

// Used for positioning of the cursor when a number or a operation is clicked.
// if the number/opration is clicked on the left side, cursor will apear on the left of it,
// same stuff for the right side.

function cursorHalf(event, id) {
    const clickTarget = event.target;
    const clickTargetWidth = clickTarget.offsetWidth;
    const xCoordInClickTarget = event.clientX - clickTarget.getBoundingClientRect().left;

    if (activeDiv.classList.contains('cursor')) { // If cursor is active -> hide it
        activeDiv.classList.remove("cursor");
        activeDiv.innerHTML = '';
    }
    activeDiv.style.backgroundColor = 'transparent';
    searchedIndex = -1;
    position = findPosition(id, '0][0');

    if (clickTargetWidth / 2 > xCoordInClickTarget) {
        position = goSideways(-2, position);
    } else {
        position = goSideways(2, position);
    }

    activeDivNumber = eval(`positionRoutes[${position}]`);
    activeDivNumber = String(activeDivNumber);
    activeDiv = document.getElementById(activeDivNumber);
    activeDiv.classList.add("cursor");
    activeDiv.innerHTML = '|';
}




