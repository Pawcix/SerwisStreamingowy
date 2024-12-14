const settingsMenu = document.querySelector('#settingsMenu');
const settingsMenuCloseButton = document.querySelector('#settingsMenuCloseButton')

const volumeRange = document.querySelector('#volumeRange');
const volumeValue = document.querySelector('#volumeValue');
const brightnessRange = document.querySelector('#brightnessRange');
const brightnessValue = document.querySelector('#brightnessValue');

const closeSettingsMenu = () => {
    settingsMenu.style.display = 'none'
}

const applySettings = () => {
    document.body.style.filter = `brightness(${brightnessRange.value}%)`;

    if (typeof videoElement !== 'undefined') {
        videoElement.volume = volumeRange.value / 100;
    }
}

settingsMenuCloseButton.addEventListener('click', closeSettingsMenu)
brightnessRange.addEventListener('input', () => {
    brightnessValue.textContent = `${brightnessRange.value}%`;
    applySettings();
});

volumeRange.addEventListener('input', () => {
    volumeValue.textContent = `${volumeRange.value}%`;
    applySettings();
});



