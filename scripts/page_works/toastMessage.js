let toastTimeoutStatus = false;

function toastMessage(message, timeout) {
    const toastDiv = document.getElementById("toast");
    toastDiv.innerHTML = message;
    toastDiv.style.bottom = "9.375rem";
    toastDiv.style.opacity = "1";
    toastTimeoutStatus = true;
    toastTimeout(timeout);
}

function toastTimeout(timeout = 3500) {
    return setTimeout(() => {
        const toastDiv = document.getElementById("toast");
        toastDiv.style.bottom = "0";
        toastDiv.style.opacity = "0";
        toastTimeoutStatus = false;
    }, timeout);
};

if (!window.chrome && localStorage.getItem(`browser_chrome_told`) == null) {
    toastMessage(`For the best performance it is recommended to use a Chrome browser or a one working on Chromium engine.`, 7000);
    localStorage.setItem(`browser_chrome_told`, `true`);
}


