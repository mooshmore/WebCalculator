const allOperations = ['sin', 'cos', 'tan', 'power', 'radical', 'log', 'bra', 'randomize', 'absolute', 'factorial'];
const numbersAndOperations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, `-`, `+`, `*`, `/`, `.`, `π`];

function addToExpression(value) {
    const scrollRightValue = Math.abs(activeDiv.offsetLeft + -450);

    // Add brackets to parent element if it doesn't have any and a operation is being added
    // Only a visual change 
    if (allOperations.includes(value) && activeDiv.parentNode.className !== `x mainX` && activeDiv.className !== 'x' && activeDiv.className !== 'y' && activeDiv.parentNode.parentNode.innerHTML.charAt(0) !== '(') {
        activeDiv.parentNode.parentNode.innerHTML = `(${activeDiv.parentNode.parentNode.innerHTML})`;
        assignNewValues();
    }

    if ( numbersAndOperations.includes(value)) {
        let cursorSpan = document.getElementById(activeDiv.id);
        switch (true) {
            case (activeDiv.className.includes('whitespace')):
                cursorSpan.insertAdjacentHTML("afterend", `<span id="${x + 1}" class="num">${value}</span><span class="whitespace special" id="${x + 1}.1"></span>`);
                assignPositionRoutes_numbers();
                break;
            case (activeDiv.className == 'x') || (activeDiv.className == 'y'):
                addToExpression('ghostBrackets');
                cursorSpan = document.getElementById(activeDiv.id);
                cursorSpan.insertAdjacentHTML("afterend", `<span id="${x + 1}" class="num">${value}</span><span class="whitespace special" id="${x + 1}.1"></span>`);
                assignPositionRoutes_numbers();
                break;
        }
    }
    
    switch (true) {
        case (activeDiv.className.includes('whitespace')):

            let cursorSpan = document.getElementById(activeDiv.id);

                switch (value) {
                    case 'log':
                        cursorSpan.insertAdjacentHTML("afterend", `<span id="${x + 1}" class="log">log<sub class="log_base"><span id="${x + 2}" class="x">◻</span></sub><span id="${x + 3}" class="y">◻</span></span><span class="whitespace" id="${x + 1}.1"></span>`);
                        assignPositionRoutes_cursor('double');
                        assignEventListeners('double');
                        break;
                    case 'radical':
                        cursorSpan.insertAdjacentHTML("afterend", `<span id="${x + 1}" class="rad"><sup class="radical_sup"><span id="${x + 2}"class="x">◻</span></sup><span class="x">&radic;<span class="x"><span id="${x + 3}" class="y">◻</span></span></span></span><span class="whitespace" id="${x + 1}.1"></span>`);
                        assignPositionRoutes_cursor('double');
                        assignEventListeners('double');
                        break;
                    case 'brackets':
                        cursorSpan.insertAdjacentHTML("afterend", `<span id="${x + 1}" class="bra">(<span id="${x + 2}" class="x"><span class="whitespace" id="${x + 2}.1"></span></span>)</span><span class="whitespace" id="${x + 1}.1"></span>`);
                        assignPositionRoutes_brackets('cursor');
                        break;
                    case 'sin':
                        cursorSpan.insertAdjacentHTML("afterend", `<span id="${x + 1}" class="sin">sin<span id="${x + 2}" class="x">◻</span>°</span><span class="whitespace" id="${x + 1}.1"></span>`);
                        assignPositionRoutes_cursor('single');
                        assignEventListeners('single');
                        break;
                    case 'cos':
                        cursorSpan.insertAdjacentHTML("afterend", `<span id="${x + 1}" class="cos">cos<span id="${x + 2}" class="x">◻</span>°</span><span class="whitespace" id="${x + 1}.1"></span>`);
                        assignPositionRoutes_cursor('single');
                        assignEventListeners('single');
                        break;
                    case 'tan':
                        cursorSpan.insertAdjacentHTML("afterend", `<span id="${x + 1}" class="tan">tan<span id="${x + 2}" class="x">◻</span>°</span><span class="whitespace" id="${x + 1}.1"></span>`);
                        assignPositionRoutes_cursor('single');
                        assignEventListeners('single');
                        break;
                    case 'absolute':
                        cursorSpan.insertAdjacentHTML("afterend", `<span id="${x + 1}" class="abs">|<span id="${x + 2}" class="x">◻</span>|</span><span class="whitespace" id="${x + 1}.1"></span>`);
                        assignPositionRoutes_cursor('single');
                        assignEventListeners('single');
                        break;
                    case 'factorial':
                        cursorSpan.insertAdjacentHTML("afterend", `<span id="${x + 1}" class="fac"><span id="${x + 2}" class="x">◻</span>!<span class="whitespace" id="${x + 1}.1"></span>`);
                        assignPositionRoutes_cursor('single');
                        assignEventListeners('single');
                        break;
                    case 'power':
                        cursorSpan.insertAdjacentHTML("afterend", `<span id="${x + 1}" class="pow"><span id="${x + 2}" class="x">◻</span><sup class="power_sup"><span id="${x + 3}" class="y">◻</span></sup></span></span><span class="whitespace" id="${x + 1}.1"></span>`);
                        assignPositionRoutes_cursor('double');
                        assignEventListeners('double');
                        break;
                    case 'randomize':
                        cursorSpan.insertAdjacentHTML("afterend", `<span id="${x + 1}" class="ran">rand(<span id="${x + 2}" class="x">◻</span>,<span id="${x + 3}" class="y">◻</span>)</span><span class="whitespace" id="${x + 1}.1"></span>`);
                        assignPositionRoutes_cursor('double');
                        assignEventListeners('double');
                        break;  
                }
                break;
                
        case (activeDiv.className == 'x') || (activeDiv.className == 'y'):
            switch (value) {
                case 'log':
                    addToExpression('brackets');
                    addToExpression('log');
                    break;
                case 'power':
                    addToExpression('brackets');
                    addToExpression('power');
                    break;
                case 'radical':
                    addToExpression('brackets');
                    addToExpression('radical');
                    break;
                case 'randomize':
                    addToExpression('brackets');
                    addToExpression('randomize');
                    break;
                case 'brackets':
                    activeDiv.innerHTML = `<span id="${x + 1}" class="bra">(<span id="${x + 2}" class="x"><span class="whitespace" id="${x + 2}.1"></span></span>)</span>`;
                    assignPositionRoutes_brackets('xy');
                    break;
                case 'sin':
                    addToExpression('brackets');
                    addToExpression('sin');
                    break;
                case 'cos':
                    addToExpression('brackets');
                    addToExpression('cos');
                    break;
                case 'tan':
                    addToExpression('brackets');
                    addToExpression('tan');
                    break;
                case 'absolute':
                    addToExpression('brackets');
                    addToExpression('absolute');
                    break;
                case 'factorial':
                    addToExpression('brackets');
                    addToExpression('factorial');
                    break;
                case 'ghostBrackets':
                    activeDiv.innerHTML = `<span id="${x + 1}" class="bra"><span id="${x + 2}" class="x"><span class="whitespace" id="${x + 2}.1"></span></span></span>`;
                    assignPositionRoutes_brackets('xy');
                    break;
            }
        break;
    }
    checkScrollbar();
    document.getElementsByClassName('expression')[0].scrollTo(scrollRightValue, 0);
}

function checkScrollbar() {
    if (document.getElementsByClassName('expression')[0].scrollWidth > 566) {
        document.getElementsByClassName('expression')[0].style.overflowX = `auto`;
    } else {
        document.getElementsByClassName('expression')[0].style.overflowX = `hidden`;
    }
}


function assignPositionRoutes_numbers() {
    activeDiv.classList.remove("cursor");
    activeDiv.innerHTML = '';
    const tempCursorId = getPositionsLastValue(position);
    const tempCursorPosition = deleteLastLevel(position);

    // tempCursorArray is a REFERENCE to position routes, not a copy of it!
    let tempCursorArray = eval(`positionRoutes[${tempCursorPosition}]`);
    tempCursorArray.splice(tempCursorId + 1, 0, "num", x + 1, "blank", x + 1.1);
    position = goSideways(4, position);
    activeDivNumber = eval(`positionRoutes[${position}]`);

    const tempX = x;
    document.getElementById(`${x + 1}`).setAttribute("onclick", `cursorHalf(event, ${tempX + 1})`);
    document.getElementById(`${x + 1}.1`).setAttribute("onclick", `mouseNavigation(${tempX + 1})`);
    document.getElementById(`${x + 1}`).setAttribute("onmouseover", `customHover(${tempX + 1}, event)`);
    document.getElementById(`${x + 1}`).setAttribute("onmouseout", `clearBackground(${tempX + 1})`);
    document.getElementById(`${x + 1}.1`).setAttribute("onmouseover", `customHover(${tempX + 1}, event)`);
    document.getElementById(`${x + 1}.1`).setAttribute("onmouseout", `clearBackground(${tempX + 1})`);
    x += 1;
    assignNewValues();
}

function assignPositionRoutes_brackets(type){
    const tempX = x;
    let mouseValue2;

    switch (type) {
        case 'xy':
            activeDiv.style.backgroundColor = 'transparent';
            position = goSideways(-1, position);
            eval(`positionRoutes[${position}][0] = []`);          // operation table
            eval(`positionRoutes[${position}][1] = ${x + 1}`);     // operation ID
            eval(`positionRoutes[${position}][0][0] = 'blank'`);        // x cursor
            eval(`positionRoutes[${position}][0][1] = ${x + 2.1}`);  // x ID
            position += `][0][1`;

            mouseValue2 = parseFloat(`${tempX + 2}.1`);
            assignEventListeners_auto(1);
            break;
        case 'cursor':
            activeDiv.classList.remove("cursor");
            activeDiv.innerHTML = '';
            const tempCursorId = getPositionsLastValue(position);
            const tempCursorPosition = deleteLastLevel(position);

            // tempCursorArray is a REFERENCE to position routes, not a copy of it!
            let tempCursorArray = eval(`positionRoutes[${tempCursorPosition}]`); 
            tempCursorArray.splice(tempCursorId + 1, 0, ['blank', x + 2.1], x + 1, "blank", x + 1.1);
            position = goSideways(1, position);
            position += '][1';
            activeDivNumber = eval(`positionRoutes[${position}]`);

            const mouseValue = parseFloat(`${tempX + 1}.1`);
            mouseValue2 = parseFloat(`${tempX + 2}.1`);

            const tempX3 = x;
            document.getElementById(x + 1).setAttribute("onclick", `cursorHalf(event, ${tempX3 + 1})`);
            document.getElementById(x + 1).setAttribute("onmouseover", `customHover(${tempX3 + 1}, event)`);
            document.getElementById(x + 1).setAttribute("onmouseout", `clearBackground(${tempX3 + 1})`);
            document.getElementById(`${x + 1}.1`).setAttribute("onclick", `mouseNavigation(${mouseValue})`); // Cursor event
            break;
    }
    let tempValue = `${x + 2.1}`;
    document.getElementById(`${x + 2}.1`).setAttribute("onclick", `mouseNavigation(${mouseValue2})`); // Cursor event
    document.getElementById(tempValue).setAttribute("onmouseover", `customHover(${tempValue}, event)`); // Cursor event
    document.getElementById(tempValue).setAttribute("onmouseout", `clearBackground(${tempValue})`); // Cursor event
    x += 3; 
    assignNewValues();
}

function assignPositionRoutes_cursor(amount) {
    activeDiv.classList.remove("cursor");
    activeDiv.innerHTML = '';
    const tempCursorId = getPositionsLastValue(position);

    
    const tempCursorPosition = deleteLastLevel(position);
    // tempCursorArray is a REFERENCE to position routes, not a copy of it!

    let tempCursorArray = eval(`positionRoutes[${tempCursorPosition}]`); 

    switch (amount) {
        case 'single':
            tempCursorArray.splice(tempCursorId + 1, 0, [[], x + 2], x + 1, "blank", x + 1.1);
            break;
        case 'double':
            tempCursorArray.splice(tempCursorId + 1, 0, [[], x + 2, [], x + 3], x + 1, "blank", x + 1.1);
            break;
    }

    position = goSideways(1, position);
    position += '][1';
    activeDivNumber = eval(`positionRoutes[${position}]`);
    activeDiv = document.getElementById(`${activeDivNumber}`);
    activeDiv.style.backgroundColor = activeExpressionBg;
}

function assignEventListeners(amount, cursor) {
    const tempX3 = x;
    document.getElementById(x + 1).setAttribute("onclick", `cursorHalf(event, ${tempX3 + 1})`);
    document.getElementById(x + 1).setAttribute("onmouseover", `customHover(${tempX3 + 1}, event)`);
    document.getElementById(x + 1).setAttribute("onmouseout", `clearBackground(${tempX3 + 1})`);
    assignEventListeners_auto(2);
    
    const mouseValue2 = parseFloat(`${x + 1}.1`);
    document.getElementById(mouseValue2).setAttribute("onclick", `mouseNavigation(${mouseValue2})`); // Cursor event
    document.getElementById(mouseValue2).setAttribute("onmouseover", `customHover(${mouseValue2}, event)`);  // Cursor event
    document.getElementById(mouseValue2).setAttribute("onmouseout", `clearBackground(${mouseValue2})`);  // Cursor event
    if ( amount == 'double') {
        assignEventListeners_auto(3);
        x += 1;
    }
    x += 2;
}

function assignEventListeners_auto(x1) {
    const tempX = x;
    document.getElementById(x + x1).setAttribute("onclick", `mouseNavigation(${tempX + x1})`);
    document.getElementById(x + x1).setAttribute("onmouseover", `customHover(${tempX + x1}, event)`);
    document.getElementById(x + x1).setAttribute("onmouseout", `clearBackground(${tempX + x1})`);
}

