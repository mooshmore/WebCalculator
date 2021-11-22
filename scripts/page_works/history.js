document.getElementsByClassName('history_bin')[0].addEventListener( `click`, function() {   // Delete all history
    operations_storage_html = [];
    operations_storage_postitionRoutes = [];
    operations_storage_xValue = [];
    history_item_html = [];
    
    document.getElementsByClassName('history')[0].style.opacity = `0`;
    var nodes = document.getElementsByClassName('history')[0].childNodes;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'div') {
            nodes[i].style.left = `6.25rem`;
        }
    }
    setTimeout(() => {
        document.getElementsByClassName('history')[0].innerHTML = ``;

        localStorage.removeItem(`operations_storage_html`);
        localStorage.removeItem(`operations_storage_postitionRoutes`);
        localStorage.removeItem(`operations_storage_xValue`);
        localStorage.removeItem(`history_item_html`);
        document.getElementsByClassName('history')[0].style.opacity = `1`;
    }, 400);
});

let last_operation_html;
let last_operation_postitionRoutes;
let last_operation_xValue;

function history(wholeOperation) {  // Save new element to history
    let operation_content = document.getElementsByClassName('operation')[0].innerHTML;
    let result_content = document.getElementsByClassName('mainx')[0].innerHTML;

    const history_item_node = document.createElement(`div`);
    history_item_node.className = 'history_item';
    history_item_node.innerHTML = `<div class="history_item_result"><div class="history_item_result_content">${result_content}</div></div><div class="history_item_operation"><div class="history_item_operation_content">${operation_content}</div></div><div class="history_item_delete"><img class="history_item_img" src="images/delete.svg"></div>`;

    document.getElementsByClassName('history')[0].insertAdjacentElement('afterbegin', history_item_node);
    document.getElementsByClassName("history_item")[0].setAttribute("onclick", `restoreOperation(event)`); 
    document.getElementsByClassName("history_item_img")[0].setAttribute("onclick", "deleteHistory_single(event)"); 
    document.getElementsByClassName("history_item")[0].classList.add(`history_add_animation`);
    resetIds();

    last_operation_html = wholeOperation;
    last_operation_postitionRoutes = JSON.parse(JSON.stringify(positionRoutes));
    last_operation_xValue = x;

    operations_storage_html.unshift(wholeOperation);
    operations_storage_postitionRoutes.unshift(JSON.parse(JSON.stringify(positionRoutes)));
    operations_storage_xValue.unshift(x);

    history_item_html = document.getElementsByClassName('history')[0].innerHTML;

    localStorage.setItem(`operations_storage_html`, `${JSON.stringify(operations_storage_html)}`);
    localStorage.setItem(`operations_storage_postitionRoutes`, `${JSON.stringify(operations_storage_postitionRoutes)}`);
    localStorage.setItem(`operations_storage_xValue`, `${JSON.stringify(operations_storage_xValue)}`);
    localStorage.setItem(`history_item_html`, `${history_item_html}`);
}

function deleteHistory_single(event) { // Delete single history element
    const operation_number = findParentId(event);
    document.getElementsByClassName("history_item")[operation_number].classList.add(`history_delete_animation`);
    setTimeout(() => {
        document.getElementsByClassName("history_item")[operation_number].style.height = `0`;
    }, 350);
    setTimeout(() => {
        document.getElementsByClassName('history_item')[operation_number].remove();
        operations_storage_html.splice(operation_number, 1);
        operations_storage_postitionRoutes.splice(operation_number, 1);
        operations_storage_xValue.splice(operation_number, 1);
        // The Indexes have been moved so the id's need to be updated too
        resetIds();

        history_item_html = document.getElementsByClassName('history')[0].innerHTML;

        localStorage.setItem(`operations_storage_html`, `${JSON.stringify(operations_storage_html)}`);
        localStorage.setItem(`operations_storage_postitionRoutes`, `${JSON.stringify(operations_storage_postitionRoutes)}`);
        localStorage.setItem(`operations_storage_xValue`, `${JSON.stringify(operations_storage_xValue)}`);
        localStorage.setItem(`history_item_html`, `${history_item_html}`);
    }, 400);
}

function restoreOperation(event) {  // Restore element from history to calculate
    if (event.target.className == `history_item_img`) { // Don't restore if user has pressed the delete button
        return;
    }
    const operation_number = findParentId(event);

    restoreToBasic();
    positionRoutes = JSON.parse(JSON.stringify(operations_storage_postitionRoutes[operation_number]));
    document.getElementsByClassName('mainX')[0].innerHTML = operations_storage_html[operation_number];
    x = operations_storage_xValue[operation_number];

    setCursorOnEnd();
    currentPageState = `calculating`;
}

document.getElementsByClassName('operation')[0].addEventListener(`click`, function () {   // Restore from operation
    restoreToBasic();
    positionRoutes = JSON.parse(JSON.stringify(last_operation_postitionRoutes));
    document.getElementsByClassName('mainX')[0].innerHTML = last_operation_html;
    x = last_operation_xValue;

    setCursorOnEnd();
    currentPageState = `calculating`;
});

function setCursorOnEnd() {
    const lastCursorId = parseFloat(document.getElementsByClassName('mainX')[0].lastElementChild.id);
    searchedIndex = -1; // Added, not tested
    position = findPosition(lastCursorId, `0`);
    assignNewValues();
    document.getElementsByClassName('expression')[0].scrollTo(document.getElementsByClassName('expression')[0].scrollWidth, 0);
}

function findParentId(event) {
    let parentString = ``;
    let parent;
    do {
        parentString += `.parentNode`;
        parent = eval(`event.target${parentString}`);
    } while (parent.id.length < 10);
    return parent.id.substr(13);
}

function resetIds() {
    for (let index = 0; index < document.getElementsByClassName('history_item').length; index++) {
        document.getElementsByClassName('history_item')[index].removeAttribute("id");
        document.getElementsByClassName('history_item')[index].setAttribute("id", 'history_item_' + index);
    }
}