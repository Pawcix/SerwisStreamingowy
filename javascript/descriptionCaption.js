const toggleCaptionsDescription = document.querySelector('#toggleCaptionsDescription');
const captionsContainer = document.querySelector('#captionsContainer')

let descriptiveCaptionsEnabled = false;

const descriptiveCaptionsData = {
    0: [
        { start: 0, end: 5, text: "Na ekranie widoczna jest osoba lecąca na paralotni z żółto-niebieskim skrzydłem." },
        { start: 5, end: 10, text: "W tle rozciąga się widok na turkusowe morze oraz zielone wzgórza i pola w jasnobrązowych odcieniach, tworzące geometryczne wzory." },
        { start: 10, end: 15, text: "Bezchmurne niebo podkreśla jasność i przestrzeń sceny, nadając jej dynamiczny i pełen swobody charakter." },
    ],
    1: [
        { start: 0, end: 8, text: "Na ekranie widoczne są gęsi brodzące w wodzie, otoczone przez wysokie, zielone trzciny." },
        { start: 8, end: 16, text: "Woda jest spokojna, odbijając trzciny i ptaki." },
        { start: 16, end: 25, text: "Tło jest delikatnie rozmyte, podkreślając naturalne środowisko i spokojną atmosferę." }
    ],
    2: [
        { start: 0, end: 6, text: "Na ekranie widoczny jest mały strumień przepływający przez las, otoczony kamieniami porośniętymi mchem." },
        { start: 6, end: 12, text: "Podłoże i zbocze w tle są pokryte intensywnie czerwonymi liśćmi, które kontrastują z zielenią mchu." },
        { start: 12, end: 18, text: "Woda jest przejrzysta, delikatnie spieniona, a w tle widoczne są nagie drzewa i naturalny krajobraz." },
    ],
    3: [
        { start: 0, end: 4, text: "Na ekranie widać zawieszone na gałęzi drzewa srebrne dzwonki wiatrowe." },
        { start: 4, end: 7, text: "W tle znajduje się gęsta zielona roślinność, oświetlona światłem słonecznym." },
        { start: 7, end: 10, text: "Pień drzewa po prawej stronie ma chropowatą, brązową korę pokrytą jasnymi plamami." },
        { start: 10, end: 13, text: "Tło jest rozmyte, co podkreśla główny element sceny." },
    ]
};

const resetDescriptiveCaptions = () => {
    descriptiveCaptionsEnabled = false;
    captionsContainer.style.display = 'none';
    captionsContainer.textContent = '';
    toggleCaptionsDescription.checked = false;
};

const updateDescriptiveCaptions = () => {
    if (!descriptiveCaptionsEnabled) {
        captionsContainer.style.display = 'none';
        return;
    }

    const currentTime = videoElement.currentTime;
    const captionsData = descriptiveCaptionsData[currentFilmIndex] || [];
    const currentCaption = captionsData.find(item => currentTime >= item.start && currentTime < item.end);

    if (currentCaption) {
        captionsContainer.textContent = currentCaption.text;
        captionsContainer.style.display = 'block';
    } else {
        captionsContainer.textContent = '';
        captionsContainer.style.display = 'none';
    }
}

toggleCaptionsDescription.addEventListener('change', () => {
    descriptiveCaptionsEnabled = toggleCaptionsDescription.checked;
});


videoPlayer.style.position = 'relative';
videoPlayer.appendChild(captionsContainer);

videoElement.addEventListener('timeupdate', updateDescriptiveCaptions);
