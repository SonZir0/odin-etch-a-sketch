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
    let newDivDimensions = actualGridLength/size;
    let newDiv;
    for(let i = 1; i <= size**2; i++) {
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
    Array.from(childList).forEach( (child) => {
        grid.removeChild(child);
    });
}

function randomColor() {
    let newColor = (Math.floor(Math.random() * POSSIBLE_COLORS)).toString(16);
    while(newColor.length < 6)
        newColor = "0" + newColor;
    
    nextColor = "#" + newColor;
    sample.style.backgroundColor = nextColor;
}

function draw(event) {
    if (event.type === 'mouseover' && !mouseDown)
     return 0;

    let cell = event.target;
    if(cell.classList[0] !== "cell")
        return 0;

    console.log(nextColor);
    cell.style.backgroundColor = nextColor;
    
    if (colorRandBtn.classList[1] !== undefined) {
        randomColor();
    }
}
//actualGridLength is gridLength without margin, border and padding. For new divs
let actualGridLength;
let mouseDown = false;
let interface = document.querySelector('.interface');
let grid = document.querySelector('.grid');
let nextColor = "black";
let sample = document.querySelector('.sample');
let colorBlackBtn = document.querySelector('.black');
let colorRandBtn = document.querySelector('.random');
let eraserBtn = document.querySelector('.eraser');
let sizeValue = document.querySelector('#sizeValue');
let applyBtn = document.querySelector('.apply');

document.body.addEventListener('mousedown',  () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);
setGridSizeOnLoad();
initGrid();

//Prevent drag on .grid and smaller divs
grid.addEventListener('mousedown', (event) => event.preventDefault());
grid.addEventListener('mouseover', draw);
grid.addEventListener('mousedown', draw);

colorBlackBtn.addEventListener('click', () => {
    nextColor = "black";
    sample.style.backgroundColor = nextColor;

    let temp = document.querySelector(".highlight");
    if (temp !== null)
        temp.classList.remove("highlight");
    colorBlackBtn.classList.add("highlight");
});

colorRandBtn.addEventListener('click', () => {
    randomColor();

    let temp = document.querySelector(".highlight");
    if (temp !== null)
        temp.classList.remove("highlight");
    colorRandBtn.classList.add("highlight");
});

eraserBtn.addEventListener('click', () => {
    nextColor = "white";
    sample.style.backgroundColor = nextColor;

    let temp = document.querySelector(".highlight");
    if (temp !== null)
        temp.classList.remove("highlight");
    eraserBtn.classList.add("highlight");
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