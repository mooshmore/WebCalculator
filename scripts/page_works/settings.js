document.getElementsByClassName('settings')[0].addEventListener('click', function (event) { // Display settings if clicked on the settings 
    const targetClass = event.target.className;

    if( !settingsAreActive ) {
        settingsPanel.style.pointerEvents = 'all'
        settingsPanel.style.opacity = '1';
        settingsAreActive = true;
    } else if (targetClass == 'settings_image' || targetClass == 'settings'){
        settingsAreActive = false;
        settingsPanel.style.opacity = '0';
        settingsPanel.style.pointerEvents = 'none';
    }
}
);



const settingsButton = document.getElementsByClassName('settings')[0];
const settingsPanel = document.getElementsByClassName('settings_panel')[0];
let settingsAreActive = false;

document.addEventListener('click', function (event) { // Hide settings if clicked anywhere else outside settings element
    const targetClass = event.target.className;
    const targetIndex = document.getElementsByClassName('settings')[0].innerHTML.indexOf(targetClass); // Checks if event.target is inside the settings
    if (targetClass !== 'settings_image' && targetClass !== 'settings' && settingsAreActive && targetIndex < 5 ) {
        settingsAreActive = false;
        settingsPanel.style.opacity = '0';
        settingsPanel.style.pointerEvents = 'none';
    }
});

document.getElementById('increase').addEventListener('click', () => rounding('increase'));
document.getElementById('decrease').addEventListener('click', () => rounding('decrease'));

let rounding_number = 16;

function rounding(operation) {
    if ( operation == `increase` && rounding_number < 16) {
        rounding_number++;
    } else if (operation == `decrease` && rounding_number > 0){
        rounding_number--;
    }

    if ( rounding_number == 16) {
        document.getElementsByClassName('round_value')[0].innerHTML = 'Brak';
    } else {
        document.getElementsByClassName('round_value')[0].innerHTML = rounding_number;
    }
    
    localStorage.setItem(`rounding_number`, `${rounding_number}`);
}

document.getElementsByClassName('setting_option')[0].addEventListener('click', checkRadians);

let useRadians = false;
setTimeout(() => {
    checkRadians();
}, 50);

function checkRadians() {
    if (document.getElementById("rad").checked) {
        useRadians = true;
        localStorage.setItem(`useRadians`, `${useRadians}`)
    } else {
        useRadians = false;
        localStorage.setItem(`useRadians`, `${useRadians}`);
    }
}

