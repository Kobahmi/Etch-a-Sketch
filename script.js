const defaultSIZE = 16;    //the default for size, color and mode
const defaultCOLOR = '#333333'
const defaultMODE = "black"

let currentColor = defaultCOLOR
let currentSize = defaultSIZE
let currentMode = defaultMODE

function setCurrentMode(newMode) {  
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentSize(newSize) {
    currentSize = newSize
}


const grid = document.getElementById("grid") //grab the place where you put the grid
const sizeValue = document.getElementById("sizeValue") //grab the value size of grid
const sizeSlider = document.getElementById("sizeSlider")//grabs slider
const blackBtn = document.getElementById("blackBtn")  //grab buttons
const eraserBtn = document.getElementById("eraserBtn")
const rainbowBtn = document.getElementById("rainbowBtn")
const clearBtn = document.getElementById("clearBtn")

blackBtn.onclick = () => setCurrentMode("black") //make buttons and slider do things
eraserBtn.onclick = () => setCurrentMode("eraser")
rainbowBtn.onclick = () => setCurrentMode("rainbow")
clearBtn.onclick = () => reloadGrid()
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value) //connects slider & value
sizeSlider.onchange = (e) => changeSize(e.target.value)


function setupGrid(size) { //make the function that sets the grid up to whatever size
grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
for (i=0; i<size*size; i++) {
    let square = document.createElement("div");
    square.classList.add("pixel-normal")
    square.addEventListener("mouseover", changeColor)
    square.addEventListener("mousedown", changeColor)   
    grid.appendChild(square)
}
}


function updateSizeValue(value) { //function that updates slider value
    sizeValue.innerHTML = `${value} x ${value}`
}


function changeSize(value) { //function that changes size of grid according to slider
    setCurrentSize(value)
    updateSizeValue(value)
    reloadGrid()
}


function changeColor(e) { //function that changes the color
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentMode === "rainbow") {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor =  `rgb(${randomR}, ${randomG}, ${randomB})`
    }
    else if (currentMode === "black") {
        e.target.style.backgroundColor = currentColor
    }
    else if (currentMode === "eraser") {
        e.target.style.backgroundColor = '#fefefe'
    }
}


let mouseDown = false //Stops the mouse from drawing all the time
window.onmousedown = () => (mouseDown = true)
window.onmouseup = () => (mouseDown = false)


function activateButton(newMode) { //activate buttons if chosen
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'black') {
      blackBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
      eraserBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'black') {
      blackBtn.classList.add('active')
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active')
    }
  }

    
function clearGrid() { //functions to clear and reload grid
    grid.innerHTML = ""
}


function reloadGrid() {
    clearGrid()
    setupGrid(currentSize)
}


window.onload = () => {
    setupGrid(defaultSIZE)
    activateButton(defaultMODE)
  }