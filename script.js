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
    for(let i = 1; i <= size*size; i++) {
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

function drawByDrag(event) {
    if (event.type === 'mouseover' && !mouseDown) return 0;

    let cell = event.target;
    if(cell.classList[0] !== "cell")
        return 0;

    cell.style.backgroundColor = "black";
}
//actualGridLength is gridLength without margin, border and padding. For new divs
let actualGridLength;
let mouseDown = false;
let grid = document.querySelector('.grid');

document.body.addEventListener('mousedown',  () => mouseDown = true);
document.body.addEventListener('mouseup', () => mouseDown = false);
setGridSizeOnLoad();
initGrid();

grid.addEventListener('mouseover', drawByDrag);
grid.addEventListener('mousedown', drawByDrag);

//Prevent drag on .grid and smaller divs
grid.addEventListener('mousedown', (event) => event.preventDefault());

let inputValue = document.querySelector('.inputValue');
let applyBtn = document.querySelector('.apply');
inputValue.value = 16;

inputValue.addEventListener('input', (event) => {
    if (inputValue.value < 1)
        inputValue.value = 1;
    if (inputValue.value > 100)
        inputValue.value = 100;
});

applyBtn.addEventListener('click', () => {
    removeGrid();
    initGrid(inputValue.value);
});