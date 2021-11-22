let operations_storage_html = [];
let operations_storage_postitionRoutes = [];
let operations_storage_xValue = [];
let history_item_html; // Used to restore history from cookies


if (localStorage.getItem("rounding_number") !== null) {
    rounding_number = localStorage.getItem(`rounding_number`);
    rounding_number = parseInt(rounding_number);
    rounding();
}

if (localStorage.getItem("useRadians") !== null) {
    useRadians = localStorage.getItem(`useRadians`);
    useRadians = (useRadians == 'true'); // Convert to boolean
}

if (localStorage.getItem("operations_storage_html") !== null) {
    operations_storage_html = localStorage.getItem(`operations_storage_html`);
    operations_storage_html = JSON.parse(operations_storage_html);
}

if (localStorage.getItem("operations_storage_postitionRoutes") !== null) {
    operations_storage_postitionRoutes = localStorage.getItem(`operations_storage_postitionRoutes`);
    operations_storage_postitionRoutes = JSON.parse(operations_storage_postitionRoutes);
}

if (localStorage.getItem("operations_storage_xValue") !== null) {
    operations_storage_xValue = localStorage.getItem(`operations_storage_xValue`);
    operations_storage_xValue = JSON.parse(operations_storage_xValue);
}

if (localStorage.getItem("history_item_html") !== null) {
    history_item_html = localStorage.getItem(`history_item_html`);
    document.getElementsByClassName('history')[0].innerHTML = history_item_html;
}

