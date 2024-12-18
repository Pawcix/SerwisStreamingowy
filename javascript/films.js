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
            videoSrc = './movies/filmOne.mp4';
            currentFilmIndex = 0;
        } else if (index === 1) {
            videoSrc = './movies/filmTwo.mp4';
            currentFilmIndex = 1;
        } else if (index === 2) {
            videoSrc = './movies/filmThree.mp4';
            currentFilmIndex = 2;
        } else if (index === 3) {
            videoSrc = './movies/filmFour.mp4';
            currentFilmIndex = 3;
        } else {
            videoSrc = './movies/filmOne.mp4';
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
