
for (let p = 0; p < 29; p++) {
    document.getElementsByClassName("box")[p].addEventListener("click", pressAnimation);
}

// Button press animation
// Not using css animation because animating with js stacks better.

function pressAnimation(event) {
    let button;
    if (event == undefined) { // Used in deleteAll
        button = document.getElementsByClassName('box')[20].style;
    } else {
        button = event.target.style;
    }
    button.transition = "all 50ms ease";
    button.transform = "scale(0.95,0.95)";
    button.border = `0.15rem solid ${button_border_active}`;
    setTimeout(() => {
        button.transition = "all 400ms ease";
        button.transform = "scale(1,1)";
        button.border = `0rem solid ${button_border_default}`;
    }, 50);
}

// Expression hover animation

function customHover(id, event) {
    let checkedDiv = document.getElementById(id);
    if (allOperations.includes(checkedDiv.className) || checkedDiv.className == 'num' || checkedDiv.className == 'whitespace' || checkedDiv.className == 'whitespace cursor') {
        checkedDiv.parentNode.style.borderBottom = `0.0625rem solid ${underlineAccentColor}`;
    } else if (checkedDiv.style.backgroundColor !== activeExpressionBg) { // Do not change background if selected div is the active div
        checkedDiv.style.backgroundColor = customHoverColor;
    }

    event.stopPropagation(); // Only work on the deepest nested div, not the parent elements!
}

function clearBackground(id) {
    if (document.getElementById(id).style.backgroundColor !== activeExpressionBg) { // Do not change background if selected div is the active div
        document.getElementById(id).style.backgroundColor = 'transparent';
        document.getElementById(id).parentNode.style.borderBottom = `0.0625rem solid transparent`;
    }
}