let currentPageState = `calculating`;

function resultAnimation(result) {
    currentPageState = `result`;
    if (activeDiv.classList.contains('cursor')) { // If cursor is active -> hide it
        activeDiv.classList.remove("cursor");
        activeDiv.innerHTML = '';
    }
    activeDiv.style.backgroundColor = 'transparent';

    const wholeOperation = document.getElementsByClassName('mainx')[0].innerHTML;
    let expressionDiv = document.getElementsByClassName('mainx')[0];
    let operationDiv = document.getElementsByClassName('operation')[0];
    operationDiv.innerHTML = expressionDiv.innerHTML;
    document.getElementById('1.1').remove();


    // Dont allow to make changes in operation history preview
    const nodes = document.getElementsByClassName('operation')[0].querySelectorAll("span");
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'span') {
            nodes[i].removeAttribute(`onclick`);
            nodes[i].removeAttribute(`onmouseover`);
            nodes[i].removeAttribute(`onmouseout`);
            nodes[i].removeAttribute(`id`);
        }
    }


    setTimeout(() => {
        operationDiv.style.opacity = 1;
    }, 215);
    expressionDiv.style.opacity = 0;
    expressionDiv.style.userSelect = 'text'; // User can copy the result
    setTimeout(() => {
        expressionDiv.innerHTML = result;
        document.getElementsByClassName('mainX')[0].style.borderBottom = `0`;
        expressionDiv.style.opacity = 1;
    }, 314);
    setTimeout(() => {
        history(wholeOperation);
    }, 400);
    
}