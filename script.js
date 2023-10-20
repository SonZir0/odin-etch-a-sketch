const POSSIBLE_COLORS = 16777215; // possible colors from 000000h to FFFFFFh

/* purpose of this function is to try and fit interface and grid
   inside viewport without any mouse scrolling  */
function setGridSizeOnLoad() {
    let main = document.querySelector('main');
    // get height and width available for drawing
    let height = main.clientHeight +
        parseFloat(window.getComputedStyle(main).marginTop) +
        parseFloat(window.getComputedStyle(main).marginBottom);

    let width = main.clientWidth +
        parseFloat(window.getComputedStyle(main).marginLeft) +
        parseFloat(window.getComputedStyle(main).marginRight);

    // our grid is supposed to be a square, so we're taking the minimum value
    let gridLength = Math.floor(Math.min(height, width));
    // assign lenght to a panel above, flexbox'll decide on height
    interface.style.width = gridLength + "px";
    gridLength -= parseInt(window.getComputedStyle(interface).height);

    // take a bit (10 + whatever) of lenght for a gap between the border and
    // new divs save "actual" width/height for later (to not compute later)
    let aBitForPadding = (gridLength % 10) + 10;
    // last -10 is from borders on both sides (5px)
    actualGridLength = gridLength - aBitForPadding - 10;

    // + 'px' is necessary for assigning a pixel value
    grid.style.width = gridLength + "px";
    grid.style.height = gridLength + "px";
    grid.style.padding = (aBitForPadding / 2) + "px";
}

function initGrid(size = 16) {
    let newDivDimensions = actualGridLength / size;
    let newDiv;
    for (let i = 1; i <= size ** 2; i++) {
        newDiv = document.createElement('div');
        newDiv.style.height = newDiv.style.width = newDivDimensions + "px";
        newDiv.classList.add('cell');
        newDiv.classList.add(`${i}`);
        grid.appendChild(newDiv);
    }
}

function removeGrid() {
    let childList = grid.children;
    console.log(childList);
    Array.from(childList).forEach((child) => {
        grid.removeChild(child);
    });
}

function randomColor() {
    let newColor = (Math.floor(Math.random() * POSSIBLE_COLORS)).toString(16);
    while (newColor.length < 6)
        newColor = "0" + newColor;

    currentColor = "#" + newColor;
    sample.style.backgroundColor = currentColor;
}

function draw(event) {
    if (event.type === 'mouseover' && !mouseDown)
        return 0;

    let cell = event.target;
    if (cell.classList[0] !== "cell")
        return 0;

    if (moreOpacity.classList[1] !== undefined) {
        let temp = window.getComputedStyle(cell).getPropertyValue("opacity");
        cell.style.opacity = temp - 0.1;
        console.log(temp);
        return 0;
    }

    if (lessOpacity.classList[1] !== undefined) {
        let temp = window.getComputedStyle(cell).getPropertyValue("opacity");
        cell.style.opacity = +temp + 0.1;
        return 0;
    }

    cell.style.backgroundColor = currentColor;
    if (colorRandBtn.classList[1] !== undefined)
        randomColor();
}

function highlightNewBtn(pressedBtn) {
    let highlighted = document.querySelector(".highlight");
    if (highlighted !== null)
        highlighted.classList.remove("highlight");
    pressedBtn.classList.add("highlight");
}

//actualGridLength is gridLength without margin, border and padding. For new divs
let actualGridLength;
let mouseDown = false;
let currentColor = "black";
let interface = document.querySelector('.interface');
let grid = document.querySelector('.grid');
let sample = document.querySelector('.sample');
let colorBlackBtn = document.querySelector('.black');
let colorRandBtn = document.querySelector('.random');
let eraserBtn = document.querySelector('.eraser');
let moreOpacity = document.querySelector('.more');
let lessOpacity = document.querySelector('.less');
let sizeValue = document.querySelector('#sizeValue');
let applyBtn = document.querySelector('.apply');

document.body.addEventListener('mousedown', () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);
setGridSizeOnLoad();
initGrid();

//Prevent drag on .grid and smaller divs
grid.addEventListener('mousedown', (event) => event.preventDefault());
grid.addEventListener('mouseover', draw);
grid.addEventListener('mousedown', draw);

colorBlackBtn.addEventListener('click', () => {
    currentColor = "black";
    sample.style.backgroundColor = currentColor;
    highlightNewBtn(colorBlackBtn);
});

colorRandBtn.addEventListener('click', () => {
    randomColor();
    highlightNewBtn(colorRandBtn);
});

eraserBtn.addEventListener('click', () => {
    currentColor = "white";
    sample.style.backgroundColor = currentColor;
    highlightNewBtn(eraserBtn);
});

moreOpacity.addEventListener('click', () => {
    highlightNewBtn(moreOpacity);
});

lessOpacity.addEventListener('click', () => {
    highlightNewBtn(lessOpacity);
});

sizeValue.addEventListener('input', (event) => {
    if (sizeValue.value < 1)
        sizeValue.value = 1;
    if (sizeValue.value > 100)
        sizeValue.value = 100;
});

applyBtn.addEventListener('click', () => {
    removeGrid();
    initGrid(sizeValue.value);
});