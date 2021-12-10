let grid = document.querySelector('.grid');
let gridSize = 16;

let littleBox
let appliedColor = "rgb(0, 0, 0)"

let colorStyle = "solid"

// Given "rgb(n1, n2, n3) returns [n1, n2, n3]"
function getColorComponents(rgbString) {
    let componentsKindOf = rgbString.split('(')[1].split(',')

    return componentsKindOf.map(part => parseInt(part))
}

function applyColor(e) {
    let boxToColor = e.target;
    if (colorStyle == "solid") {
        boxToColor.style.backgroundColor = appliedColor
    } else if (colorStyle == "random") {
        boxToColor.style.backgroundColor = randomColor()
    } else if (colorStyle == "darker") {
        // TODO: actually darken the color
        // trovare il colore
        let oldColor = boxToColor.style.backgroundColor
        // decomporre il colore in rgb
        let components = getColorComponents(oldColor)
        //
        let darkerRgb = components.map((part) => {
            return part - (part * 10 / 100)
        }) 
        let rgb = `rgb(${darkerRgb[0]}, ${darkerRgb[1]}, ${darkerRgb[2]})`
        boxToColor.style.backgroundColor = rgb
    }
}

function makeBox() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        littleBox = document.createElement('div');
        littleBox.style.width = `${600 / gridSize}px`;
        littleBox.style.height = `${600 / gridSize}px`; 
        littleBox.style.backgroundColor = "rgb(255, 255, 255)"
        littleBox.addEventListener('mouseenter', applyColor) 
        grid.appendChild(littleBox)   
    } 
}

makeBox();

let resetButton = document.querySelector('.reset')
resetButton.addEventListener('click', () => {
    grid.innerHTML = ""
    makeBox()
    appliedColor = "rgb(0, 0, 0)"
    colorStyle = "solid"
})

let eraserButton = document.querySelector('.eraser')
eraserButton.addEventListener('click', () => {
    appliedColor = "rgb(255, 255, 255)"
    colorStyle = "solid"
})

let blackButton = document.querySelector('.black')
blackButton.addEventListener('click', () => {
    appliedColor = "rgb(0, 0, 0)"
    colorStyle = "solid"
})

let colorButton = document.querySelector('#pick')
colorButton.addEventListener('input', (e) => {
    appliedColor = e.target.value;
    colorStyle = "solid"
})


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomColor() {
    let r = getRandomInt(256)
    let g = getRandomInt(256)
    let b = getRandomInt(256)
    let rgb = `rgb(${r}, ${g}, ${b})`
    return rgb;
} 


let rainbowButton = document.querySelector('.rainbow')
rainbowButton.addEventListener('click', () => {
    colorStyle = "random"
})


let sizeBar = document.querySelector('#size')
sizeBar.addEventListener('input', (e) => {
    gridSize = e.target.value
    grid.innerHTML = ""
    makeBox()
    let sizeValue = document.querySelector('.size-value')
    sizeValue.textContent = `${sizeBar.value} x ${sizeBar.value}`
})

let shadowButton = document.querySelector('.shadow')
shadowButton.addEventListener('click', () => {
    colorStyle = "darker"
})