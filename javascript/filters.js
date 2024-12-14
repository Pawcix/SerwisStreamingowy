const resetFilters = () => {
    ['protanopiaFilter', 'deuteranopiaFilter', 'tritanopiaFilter'].forEach(function (id) {
        const filterElement = document.getElementById(id);
        if (filterElement) {
            filterElement.remove();
        }
    });
    document.body.style.filter = '';
}

const simulateProtanopia = () => {
    const matrixValues = `
    0.567 0.433 0.000 0 0
    0.558 0.442 0.000 0 0
    0.000 0.242 0.758 0 0
    0     0     0     1 0
    `.replace(/\s+/g, ' ').trim();
    applyColorBlindnessFilter('protanopiaFilter', matrixValues);
}

const simulateDeuteranopia = () => {
    const matrixValues = `
    0.625 0.375 0.000 0 0
    0.700 0.300 0.000 0 0
    0.000 0.300 0.700 0 0
    0     0     0     1 0
    `.replace(/\s+/g, ' ').trim();
    applyColorBlindnessFilter('deuteranopiaFilter', matrixValues);
}

const simulateTritanopia = () => {
    const matrixValues = `
    0.950 0.050 0.000 0 0
    0.000 0.433 0.567 0 0
    0.000 0.475 0.525 0 0
    0     0     0     1 0
    `.replace(/\s+/g, ' ').trim();
    applyColorBlindnessFilter('tritanopiaFilter', matrixValues);
}

const applyColorBlindnessFilter = (filterId, matrixValues) => {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    const defs = document.createElementNS(svgNS, "defs");
    const filter = document.createElementNS(svgNS, "filter");
    const feColorMatrix = document.createElementNS(svgNS, "feColorMatrix");

    resetFilters();

    if (document.getElementById(filterId)) {
        return;
    }

    svg.setAttribute("xmlns", svgNS);
    svg.setAttribute("version", "1.1");
    svg.style.position = "absolute";
    svg.style.width = 0;
    svg.style.height = 0;

    filter.setAttribute("id", filterId);
    feColorMatrix.setAttribute("type", "matrix");
    feColorMatrix.setAttribute("values", matrixValues);

    filter.appendChild(feColorMatrix);
    defs.appendChild(filter);
    svg.appendChild(defs);

    document.body.appendChild(svg);
    document.body.style.filter = `url(#${filterId})`;
}

window.simulateProtanopia = simulateProtanopia;
window.simulateDeuteranopia = simulateDeuteranopia;
window.simulateTritanopia = simulateTritanopia;
window.resetFilters = resetFilters;
