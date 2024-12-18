const videoPlayer = document.querySelector('#videoPlayer');
const videoElement = document.querySelector('#videoElement');
const videos = document.querySelector('.videos')

const rewindButton = document.querySelector('#rewindButton');
const playButton = document.querySelector('#playButton');
const forwardButton = document.querySelector('#forwardButton');
const settingsButton = document.querySelector('#settingsButton');

playButton.innerHTML = '<img src="icons/play.svg" alt="Ikona odtwarzania filmu" class="icon"></img> Pauza';

const togglePlayPause = () => {
    if (videoElement.paused) {
        videoElement.play();
        playButton.innerHTML = '<img src="icons/play.svg" alt="Ikona odtwarzania filmu" class="icon"></img> Pauza';
    } else {
        videoElement.pause();
        playButton.innerHTML = '<img src="icons/stop.svg" alt="Ikona zatrzymania filmu" class="icon"></img> Odtwórz';
    }
}

const rewindVideo = () => {
    videoElement.currentTime -= 5;
}

const forwardVideo = () => {
    videoElement.currentTime += 5;
}

const toggleSettingsMenu = () => {
    if (settingsMenu.style.display === 'flex') {
        settingsMenu.style.display = 'none';

        const allCheckboxes = document.querySelectorAll('.toggle-switch input[type="checkbox"]');
        allCheckboxes.forEach(cb => {
            cb.checked = false;
        });

        canvas.style.display = 'none';
        videoElement.style.width = '100%';
        videos.style.gap = '0px';

        resetDescriptiveCaptions();
        resetVisualDescription();
        resetAudioDescription();

    } else {
        settingsMenu.style.display = 'flex';
    }
}

playButton.addEventListener('click', togglePlayPause);
rewindButton.addEventListener('click', rewindVideo);
forwardButton.addEventListener('click', forwardVideo);
settingsButton.addEventListener('click', toggleSettingsMenu);