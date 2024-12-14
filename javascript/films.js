const filmList = document.querySelector('#filmList');
const filmListBoxInfo = document.querySelector('#filmListBoxInfo')
const filmSpan = document.querySelectorAll('.filmSpan')
const playButtons = document.querySelectorAll('.filmListBoxItemButton');

let previousButtonIndex = null;
let currentFilmIndex = 0;

const showVideoPlayer = () => {
    filmList.style.display = 'flex';
    videoPlayer.style.display = 'flex'

    if (videoPlayer.style.display = 'flex') {
        filmListBoxInfo.style.display = 'none'
    }
}

playButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        showVideoPlayer();
        let videoSrc;

        if (previousButtonIndex !== null && previousButtonIndex !== index) {
            resetDescriptiveCaptions();
            resetVisualDescription();
            resetAudioDescription();

            filmSpan[previousButtonIndex].textContent = 'Odtwórz';
        }

        if (index === 0) {
            videoSrc = 'https://videos.pexels.com/video-files/6822867/6822867-hd_1920_1080_25fps.mp4';
            currentFilmIndex = 0;
        } else if (index === 1) {
            videoSrc = 'https://videos.pexels.com/video-files/4872339/4872339-hd_1920_1080_30fps.mp4';
            currentFilmIndex = 1;
        } else if (index === 2) {
            videoSrc = 'https://videos.pexels.com/video-files/10386010/10386010-hd_2560_1440_30fps.mp4';
            currentFilmIndex = 2;
        } else if (index === 3) {
            videoSrc = 'https://videos.pexels.com/video-files/1578318/1578318-hd_1920_1080_30fps.mp4';
            currentFilmIndex = 3;
        } else {
            videoSrc = 'https://videos.pexels.com/video-files/6822867/6822867-hd_1920_1080_25fps.mp4';
            currentFilmIndex = 0;
        }

        filmSpan[index].textContent = ' Film jest odtwarzany';
        previousButtonIndex = index;

        videoElement.scrollIntoView({ behavior: 'smooth' });
        videoElement.src = videoSrc;
        videoElement.load();
        videoElement.play().catch(error => {
            console.error('Błąd podczas odtwarzania wideo:', error);
            console.error('Aktualne źródło wideo:', videoElement.src);
        });
    });
});
