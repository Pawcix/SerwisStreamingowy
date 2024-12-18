const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let currentColor = null;

canvas.style.display = 'none';

const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }

    return [h, s, l];
}

const toggleCanvasColor = (checkboxId, color) => {
    const checkbox = document.getElementById(checkboxId);
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            const allCheckboxes = document.querySelectorAll('.layers input[type="checkbox"]');
            allCheckboxes.forEach(cb => {
                if (cb !== checkbox) {
                    cb.checked = false;
                }
            });

            currentColor = color;
            canvas.style.display = 'flex';
            canvas.style.backgroundColor = currentColor;
            videoElement.style.width = '675px'
            videos.style.gap = '10px'

            resetDescriptiveCaptions();
            resetVisualDescription();
            resetAudioDescription();
        } else {
            const anyChecked = Array.from(document.querySelectorAll('.layers input[type="checkbox"]'))
                .some(cb => cb.checked);

            if (!anyChecked) {
                canvas.style.display = 'none';
            }

            videoElement.style.width = '100%'
            videos.style.gap = '0px'
        }
    });
}

toggleCanvasColor('redBtn', 'red');
toggleCanvasColor('blueBtn', 'blue');
toggleCanvasColor('greenBtn', 'green');

videoElement.addEventListener('play', function () {
    function render() {
        if (videoElement.paused || videoElement.ended) return;

        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        let frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = frame.data;

        let matchedPixels = [];

        if (currentColor !== null) {
            for (let i = 0; i < data.length; i += 4) {
                let r = data[i];
                let g = data[i + 1];
                let b = data[i + 2];

                let [h, s, l] = rgbToHsl(r, g, b);

                const satThreshold = 0.4;
                const lightMin = 0.2;
                const lightMax = 0.7;

                let match = false;
                if (currentColor === 'red') {
                    if (((h >= 0 && h <= 20) || (h >= 340 && h <= 360)) && s > satThreshold && l > lightMin && l < lightMax) {
                        match = true;
                    }
                } else if (currentColor === 'blue') {
                    if (h >= 210 && h <= 230 && s > 0.5 && l > 0.3 && l < 0.7) {
                        match = true;
                    }
                } else if (currentColor === 'green') {
                    if (h >= 80 && h <= 160 && s > 0.2 && l > 0.2 && l < 0.8) {
                        match = true;
                    }
                }

                if (match) {
                    let pixelIndex = i / 4;
                    let x = pixelIndex % canvas.width;
                    let y = Math.floor(pixelIndex / canvas.width);
                    matchedPixels.push([x, y]);
                }
            }
        }

        ctx.putImageData(frame, 0, 0);

        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.font = "15px Arial";
        for (let i = 0; i < matchedPixels.length; i += 150) {
            let [px, py] = matchedPixels[i];
            ctx.fillText("X", px, py);
        }

        requestAnimationFrame(render);
    }
    render();
});