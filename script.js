function setGridSizeOnLoad() {
    let main = document.querySelector('main');
    let grid = document.querySelector('.grid');

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
    let grid = document.querySelector('.grid');
    console.log(actualGridLength);

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

//actualGridLength is gridLength without margin, border and padding. For new divs
let actualGridLength;
let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;
setGridSizeOnLoad();
initGrid(100);

let grid = document.querySelector('.grid');
grid.addEventListener('mouseover', (event) => {
    if (event.type === 'mouseover' && !mouseDown) return 0;

    let cell = event.target;
    if(cell.classList[0] !== "cell")
        return 0;

    cell.style.backgroundColor = "black";
    console.log(cell);
});
/*
let body = document.querySelector('body');
body.style.width = "";
body.style.height = "";
main.style.margin = "0px";
*/