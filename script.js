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

// take a bit of lenght for a gap between the border and new divs
let aBitForPadding = (gridLength % 10) + 10;
gridLength -= aBitForPadding;
// + 'px' is necessary for assigning a pixel value
gridLength += "px";

grid.style.width = gridLength;
grid.style.height = gridLength;
grid.style.padding = (aBitForPadding / 2) + "px";

/*
let body = document.querySelector('body');
body.style.width = "";
body.style.height = "";
main.style.margin = "0px";
*/