for (let p = 0; p < 29; p++) {
    document.getElementsByClassName("box")[p].addEventListener("click", () => readInput(p));
}

function readInput(divNumber) {
    if ( toastTimeoutStatus ) { // Hide toast if user makes any action
        clearTimeout(toastTimeout);
        const toastDiv = document.getElementById("toast");
        toastDiv.style.bottom = "0";
        toastDiv.style.opacity = "0";
        toastTimeoutStatus = false;
    }

    if (currentPageState == `result`) {
        restoreToBasic();
        currentPageState = `calculating`;
    }

    switch (divNumber) {
        case 0:  // Power
            addToExpression('power');
            break;
        case 1:  // Radical  
            addToExpression('radical');
            break;
        case 2:  // Absolute  
            addToExpression('absolute');
            break;
        case 3:  // Factorial 
            addToExpression('factorial');
            break;
        case 4:  // Pi
            addToExpression("π");
            break;
        case 5:  // Log
            addToExpression("log")
            break;
        case 6:  // Zero  
            addToExpression(0);
            break;
        case 7:  // One
            addToExpression(1);
            break;
        case 8:  // Two
            addToExpression(2);
            break;
        case 9:  // Three
            addToExpression(3);
            break;
        case 10:  // Four
            addToExpression(4);
            break;
        case 11:  // Five
            addToExpression(5);
            break;
        case 12:  // Six
            addToExpression(6);
            break;
        case 13:  // Seven
            addToExpression(7);
            break;
        case 14:  // Eight
            addToExpression(8);
            break;
        case 15:  // Nine
            addToExpression(9);
            break;
        case 16:  // Sin
            addToExpression('sin');
            break;
        case 17:  // Cos
            addToExpression('cos');
            break;
        case 18:  // Tan
            addToExpression('tan');
            break;
        case 19:  // Forward
            navigation('arrowRight');
            break;
        case 20:  // Backspace
            deleteValues('backspace');
            break;
        case 21:  // Brackets
            addToExpression('brackets');
            break;
        case 22:  // Randomize
            addToExpression('randomize');
            break;
        case 23:  // Minus
            addToExpression('-');
            break;
        case 24:  // Divide
            addToExpression('/');
            break;
        case 25:  // Multiplication
            addToExpression('*');
            break;
        case 26:  // Plus
            addToExpression('+');
            break;
        case 27:  // Dot
            addToExpression('.');
            break;
        case 28:  // Equals
            const math_operation = document.getElementsByClassName('mainX')[0];
            if (math_operation.innerText.includes('◻')) {
                toastMessage(`◻◻( ͡° _ʖ ͡°) ? ◻◻`);
            } else if (math_operation.innerText.length > 1) {
                parser();
            } else {
                toastMessage(`( ͡° _ʖ ͡°) ? `);
            }
            break;
    }

    // If there was any user action save it so undo and redo is actual
    if (divNumber !== 19) { // History should only include changes, change of a position isn't a change ( divnumber 19 is arrow right)
        saveHistory();
    }  
}
