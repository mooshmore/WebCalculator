

document.addEventListener('keydown', function (event) {
    if ( toastTimeoutStatus ) { // Hide toast if user makes any action
        clearTimeout(toastTimeout);
        const toastDiv = document.getElementById("toast");
        toastDiv.style.bottom = "0";
        toastDiv.style.opacity = "0";
        toastTimeoutStatus = false;
    }

    const allFunctionKeys = [
        'Digit0', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9',
        'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9',
        'NumpadDecimal', 'NumpadSubtract', 'NumpadAdd', 'NumpadMultiply', 'NumpadDivide',
        'Period', 'Minus', 'Equal', 'Slash',
        'Backspace', 'Delete'
    ];
    const movementKeys = [`ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`];
    if (currentPageState == `result` && (allFunctionKeys.includes(event.code) || movementKeys.includes(event.code))) {
        restoreToBasic();
        currentPageState = `calculating`;
    }

    switch (event.code) {
        case 'Digit0':
        case 'Numpad0':
            addToExpression(0);
            break;
        case 'Digit1':
        case 'Numpad1':
            addToExpression(1);
            break;
        case 'Digit2':
        case 'Numpad2':
            addToExpression(2);
            break;
        case 'Digit3':
        case 'Numpad3':
            addToExpression(3);
            break;
        case 'Digit4':
        case 'Numpad4':
            addToExpression(4);
            break;
        case 'Digit5':
        case 'Numpad5':
            addToExpression(5);
            break;
        case 'Digit6':
        case 'Numpad6':
            addToExpression(6);
            break;
        case 'Digit7':
        case 'Numpad7':
            addToExpression(7);
            break;
        case 'Digit8':
        case 'Numpad8':
            addToExpression(8);
            break;
        case 'Digit9':  
        case 'Numpad9':
            addToExpression(9);
            break;
        case 'Period':
        case 'NumpadDecimal': 
            addToExpression('.');
            break;
        case 'Backspace':
            deleteValues('backspace');
            break;
        case 'NumpadSubtract':  
        case 'Minus':
            addToExpression('-');
            break;
        case 'NumpadAdd':
        case 'Equal':
            addToExpression('+');
            break;  
        case 'NumpadMultiply':
            addToExpression('*');
            break;  
        case 'NumpadDivide':
        case 'Slash':
            addToExpression('/');
            break;      
        case 'ArrowLeft':
            navigation('arrowLeft');
            break;
        case 'ArrowRight': 
            navigation('arrowRight');
            break;    
        case 'ArrowUp':
        case 'Enter':
            navigation('arrowUp');
            break;   
        case 'ArrowDown':
            navigation('arrowDown');
            break;  
        case 'NumpadEnter': // Equals
            readInput(28); 
            break;
        case 'Delete':
            deleteValues('del');
            break;
    };

    // If there was any user action save it so undo and redo is actual
    if (allFunctionKeys.includes(event.code)) {
        saveHistory();
    }
    
    }
);
