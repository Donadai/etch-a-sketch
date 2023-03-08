const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = '#888888';
const DEFAULT_MODE = 'random';

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        grid.appendChild(gridElement);
    }
}

function resetGrid() {
    grid.innerHTML = "";
    setupGrid(currentSize);
}

function resizeGrid() {
    const newSize = parseInt(document.getElementById('grid-size').value);
    if (Number.isInteger(newSize)) {
        document.getElementById('grid-size').value = '';
        currentSize = newSize;
        resetGrid();
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mousedown) { return; }
    if (currentMode === 'random') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentMode === 'erase') {
        e.target.style.backgroundColor = 'white';
    }
    
}

const grid = document.getElementById('grid')


let mousedown = false;
document.body.onmousedown = () => { mousedown = true; }
document.body.onmouseup = () => { mousedown = false; }

window.onload = () => {
    setupGrid(DEFAULT_SIZE);
}