const toggleAudioDescription = document.querySelector('#toggleAudioDescription');
const audioCaption = document.querySelector('#audioCaption')

let audioDescriptionEnabled = false;
let lastAudioDescriptionText = '';

const audioDescriptionData = {
    0: [
        { start: 0, end: 15, text: "Na ekranie widoczna jest osoba lecąca na paralotni z żółto-niebieskim skrzydłem. W tle rozciąga się widok na turkusowe morze oraz zielone wzgórza i pola w jasnobrązowych odcieniach, tworzące geometryczne wzory. Bezchmurne niebo podkreśla jasność i przestrzeń sceny, nadając jej dynamiczny i pełen swobody charakter." },
    ],
    1: [
        { start: 0, end: 25, text: "Na ekranie widoczne są gęsi brodzące w wodzie, otoczone przez wysokie, zielone trzciny. Ich brązowe ciała kontrastują z czarno-białymi głowami. Woda jest spokojna, odbijając trzciny i ptaki. Tło jest delikatnie rozmyte, podkreślając naturalne środowisko i spokojną atmosferę." },
    ],
    2: [
        { start: 0, end: 18, text: "Na ekranie widoczny jest mały strumień przepływający przez las, otoczony kamieniami porośniętymi mchem. Podłoże i zbocze w tle są pokryte intensywnie czerwonymi liśćmi, które kontrastują z zielenią mchu. Woda jest przejrzysta, delikatnie spieniona, a w tle widoczne są nagie drzewa i naturalny krajobraz." },
    ],
    3: [
        { start: 0, end: 13, text: "Na ekranie widać zawieszone na gałęzi drzewa srebrne dzwonki wiatrowe. W tle znajduje się gęsta zielona roślinność, oświetlona światłem słonecznym. Pień drzewa po prawej stronie ma chropowatą, brązową korę pokrytą jasnymi plamami. Tło jest rozmyte, co podkreśla główny element sceny." },
    ]
};

const resetAudioDescription = () => {
    audioDescriptionEnabled = false;
    toggleAudioDescription.checked = false;
    audioCaption.textContent = '( Wyłączony )';
    speechSynthesis.cancel();
    lastAudioDescriptionText = '';
}

const speakAudioDescription = (text) => {
    if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'pl-PL';
        speechSynthesis.speak(utter);
    }
}

const updateAudioDescription = () => {
    if (!audioDescriptionEnabled) {
        speechSynthesis.cancel();
        return;
    }

    const currentTime = videoElement.currentTime;
    const adData = audioDescriptionData[currentFilmIndex] || [];
    const currentAD = adData.find(item => currentTime >= item.start && currentTime < item.end);

    if (currentAD && currentAD.text !== lastAudioDescriptionText) {
        lastAudioDescriptionText = currentAD.text;
        speakAudioDescription(currentAD.text);
    } else if (!currentAD) {
        lastAudioDescriptionText = '';
    }
}

toggleAudioDescription.addEventListener('change', () => {
    if (toggleAudioDescription.checked) {
        audioCaption.textContent = '( Włączony )'
    } else {
        audioCaption.textContent = '( Wyłączony )'
    }

    audioDescriptionEnabled = toggleAudioDescription.checked;

    if (!audioDescriptionEnabled) {
        speechSynthesis.cancel();
        lastAudioDescriptionText = '';
    }
});

videoElement.addEventListener('timeupdate', updateAudioDescription);