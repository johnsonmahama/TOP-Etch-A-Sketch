const slider = document.querySelector("#slider")
const grideSide = 600
let squaresPerSide = slider.value

const sketchArea = document.querySelector("#container");
sketchArea.style.width = sketchArea.style.height = `${grideSide}px`

eraserActive = false
paletteActive = false
gradientActive = false

stylusColor = "lightgrey"
function setCellColour() {

    if (eraserActive === false && paletteActive === false) {stylusColor = "lightgrey"}
    else if (eraserActive === true) {stylusColor = "white"}
    else if (paletteActive === true) {stylusColor = `rgb(${Math.floor(Math.random() * 256)},
     ${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`}

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

        cell.addEventListener("click",setCellColour)
        cell.addEventListener("dblclick",setCellColour)
        cell.addEventListener("dragstart",setCellColour)
        cell.addEventListener("dragend",setCellColour)
        cell.addEventListener("dragover",setCellColour)
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
    createGridCells(this.value)
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
}

const togglePalette = document.querySelector("#toggle-palette")
togglePalette.onclick = function () {
    paletteActive = paletteActive ? false : true;
    this.style.backgroundColor = paletteActive ? "lightblue" : "";
}

const toggleGradient = document.querySelector("#toggle-gradient")
toggleGradient.onclick = function () {
    gradientActive = gradientActive ? false : true;
    this.style.backgroundColor = gradientActive ? "lightblue" : "";
}