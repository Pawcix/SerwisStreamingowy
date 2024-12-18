const toggleVisualDescription = document.querySelector('#toggleVisualDescription');
const visualContainer = document.querySelector('#visualContainer')

let visualDescriptionEnabled = false;

const visualDescriptionData = {
    0: [
        { start: 0, end: 29, text: `Dominujący kolor: \n - Niebieski (bezchmurne niebo i morze),\n- Zielony (pola i wzgórza w tle),\n - Żółty i biały (skrzydło paralotni z akcentami pomarańczowymi)` },
    ],
    1: [
        { start: 0, end: 25, text: `Dominujący kolor: \n - Zielony (trzciny i roślinność wodna),\n- Brązowy (upierzenie ptaków),\n - Czarno-biały (głowy ptaków z wyraźnym kontrastem)` },
    ],
    2: [
        { start: 0, end: 59, text: `Dominujący kolor: \n - Czerwony i pomarańczowy (opadłe liście pokrywające ziemię),\n- Zielony (mech porastający skały),\n - Brązowy (skały, kora drzew i podłoże)` },
    ],
    3: [
        { start: 0, end: 13, text: `Dominujący kolor: \n - Zielony (liście i roślinność w tle),\n- Brązowy (pień drzewa i gałęzie),\n - Srebrny (metalowe elementy dzwonków wiatrowych)` },
    ]
};

const resetVisualDescription = () => {
    visualDescriptionEnabled = false;
    visualContainer.style.display = 'none';
    visualContainer.textContent = '';
    toggleVisualDescription.checked = false;
};

const updateVisualDescription = () => {
    if (!visualDescriptionEnabled) {
        visualContainer.style.display = 'none';
        return;
    }

    const currentTime = videoElement.currentTime;
    const vdDataRaw = visualDescriptionData[currentFilmIndex] || [];
    const currentVD = vdDataRaw.find(item => currentTime >= item.start && currentTime < item.end);

    if (currentVD) {
        const formattedText = currentVD.text.replace(/\n/g, '<br>');
        visualContainer.innerHTML = formattedText;
        visualContainer.style.display = 'block';
    } else {
        visualContainer.textContent = '';
        visualContainer.style.display = 'none';
    }
}

toggleVisualDescription.addEventListener('click', () => {
    visualDescriptionEnabled = toggleVisualDescription.checked;
    updateVisualDescription();
});

videoPlayer.style.position = 'relative';
videoPlayer.appendChild(visualContainer);

videoElement.addEventListener('timeupdate', updateVisualDescription);
