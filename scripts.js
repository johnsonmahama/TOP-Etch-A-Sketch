const slider = document.querySelector("#slider")
const grideSide = 700
let squaresPerSide = slider.value

const sketchArea = document.querySelector("#container");
sketchArea.style.width = sketchArea.style.height = `${grideSide}px`

eraserActive = false
paletteActive = false
gradientActive = false
stylusActive = true

function setCellColour() {

    if (eraserActive === true) {stylusColor = "rgb(255,255,255)"}
    else if (paletteActive === true) {stylusColor = `rgb(${Math.floor(Math.random() * 256)},
     ${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`}    
    else if (gradientActive === true) {
        // Get current background color
        let currentColor = this.style.backgroundColor || "rgb(255,255,255)"; // default white
        let rgb = currentColor.match(/\d+/g).map(Number);

        // Darken each channel by 10% (or any step you like)
        rgb = rgb.map(value => Math.max(value - 25, 0)); // subtract 25 each time, stop at 0

        stylusColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        this.style.backgroundColor = stylusColor;
    }

    // else if (stylusActive === true) {stylusColor = "rgb(185,185,185)"}
    else {stylusColor = "rgb(185,185,185)"}

    this.style.backgroundColor = stylusColor
} 

let gridVisible = true

function createGridCells() {
    for (let i=0; i < (slider.value * slider.value); i++) {
        const cell = document.createElement("div")
        cell.style.width = cell.style.height = `${(grideSide/slider.value)}px`

        cell.style.border = gridVisible ? `1px solid whitesmoke`: `none`

        cell.classList.add("cell")
        sketchArea.appendChild(cell)

        cell.addEventListener("click", setCellColour)
        cell.addEventListener("dragenter",setCellColour)
    }
}
createGridCells()

const sliderContainer = document.querySelector("#slider-container")
const resolutionText = document.querySelector("#resolution-text")
resolutionText.textContent = `${slider.value} x ${slider.value} Resolution`

function removeGridCells () {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild)
    }
}

slider.oninput = function () {
    resolutionText.textContent = `${this.value} x ${this.value} Resolution`
    removeGridCells()
    createGridCells()
}

const toggleGrid = document.querySelector("#toggle-grid")
toggleGrid.style.backgroundColor = gridVisible ? "lightblue" : "";

toggleGrid.onclick = function () {
    gridVisible = gridVisible ? false : true;
    this.style.backgroundColor = gridVisible ? "lightblue" : "";

    const cells = document.querySelectorAll(".cell")
    cells.forEach(cell =>{
        cell.style.border = gridVisible ? `1px solid whitesmoke` : `none`;
    })
}

const toggleEraser = document.querySelector("#toggle-eraser")
toggleEraser.onclick = function () {
    eraserActive = eraserActive ? false : true;
    this.style.backgroundColor = eraserActive ? "lightblue" : "";

    paletteActive = false;
    togglePalette.style.backgroundColor = "";

    gradientActive = false;
    toggleGradient.style.backgroundColor = "";
}

const togglePalette = document.querySelector("#toggle-palette")
togglePalette.onclick = function () {
    paletteActive = paletteActive ? false : true;
    this.style.backgroundColor = paletteActive ? "lightblue" : "";

    eraserActive = false;
    toggleEraser.style.backgroundColor = "";

    gradientActive = false;
    toggleGradient.style.backgroundColor = "";
}

const toggleGradient = document.querySelector("#toggle-gradient")
toggleGradient.onclick = function () {
    gradientActive = gradientActive ? false : true;
    this.style.backgroundColor = gradientActive ? "lightblue" : "";

    paletteActive = false;
    togglePalette.style.backgroundColor = "";

    eraserActive = false;
    toggleEraser.style.backgroundColor = "";
}

const toggleStylus = document.querySelector("#toggle-stylus")
toggleStylus.onclick = function () {
    stylusActive = stylusActive ? false : true;
    this.style.backgroundColor = stylusActive ? "lightblue" : "";
}
