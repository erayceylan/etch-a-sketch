
const canvas = document.querySelector(".canvas");
const resolution = document.querySelectorAll("input[name='resolution']");
const color = document.querySelectorAll(".canvascolor input[type='range']");
const rainbow = { h:0, s:100, l:50};
let draw = false;

resolution.forEach(option => option.addEventListener('input',updateCanvas));
color.forEach(option => option.addEventListener('input',updateCanvasColor));

initializeCanvas()

function updateCanvasColor() {

    let color = getCanvasColor();
    let pixels = document.querySelectorAll('.canvas div')
    pixels.forEach( pixel => {pixel.style.transitionDuration = "0.0s"})
    pixels.forEach( pixel => {pixel.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;});
}

function updateCanvas() {
    
    removePixels()
    initializeCanvas()

}

function initializeCanvas() {

    /*
    this function will:
    -uptade the pixels in the canvas
    */

    let pixels = createPixels();
    addPixels(pixels);
    updateCanvasColor();
    addDrawing(pixels);
}

function addPixels(pixels) {

    /*
    input-argument: array
    this function will:
    -add pixels in the list to the canvas
    */

    pixels.forEach( pixel => {canvas.appendChild(pixel);});
}

function removePixels() {

    /*
    input-argument: array
    this function will:
    -select all the pixels in the canvas
    -remove all the pixels from the canvas
    */

    let pixels = document.querySelectorAll('.canvas div')
    pixels.forEach( pixel => {canvas.removeChild(pixel);});
}

function createPixels() {

    /* 
    this function will:
    -create an empty pixel list
    -add pixels according to user's selection of resolution
    -return list of pixels
    */

    let pixels = [];
    let pixelSize = +document.querySelector('input[name="resolution"]:checked').value;
    let resolution = pixelSize**2

    for (let i = 0; i < resolution; i++) {
        pixels[i] = document.createElement("div");
        pixels[i].style.width = `${512/pixelSize}px`;
        pixels[i].style.height = `${512/pixelSize}px`;
        pixels[i].style.border = `rgba(128, 128, 128, 0.5) solid ${512/(pixelSize*32)}px`;
    }

    return pixels
}

function addDrawing(pixels) {

    /*
    this function will:
    -add mouseover event listener to the canvas pixels
    -add mouseout event listener to the canvas pizels
    */

    pixels.forEach( pixel => pixel.addEventListener('mouseover',mouseOver));
    pixels.forEach( pixel => pixel.addEventListener('mouseout',mouseOut));
    pixels.forEach( pixel => pixel.addEventListener('mousedown',()=>{draw = true;}));
    pixels.forEach( pixel => pixel.addEventListener('mouseup',()=>{draw = false;}));


}

function mouseOver() {

    /*
    this function will:
    -change the background of mouseover pixel according to pen mode
    */
    
    let penmode = document.querySelector('input[name="penmode"]:checked').value;

    if (penmode === "trail") {
        let color = getPenColor();
        this.style.transitionDuration ="0.0s";
        this.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;

    } else if (penmode === "rainbow") {
        this.style.transitionDuration ="0.0s";
        this.style.backgroundColor = `hsl(${rainbow.h%360}, ${rainbow.s}%, ${rainbow.l}%)`;
        rainbow.h += 10;
    } else if (penmode ==="draw" && draw) {
        let color = getPenColor();
        this.style.transitionDuration ="0.0s";
        this.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    } else if (penmode ==="erase" && draw) {
        let color = getCanvasColor();
        this.style.transitionDuration ="0.0s";
        this.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    }
}

function mouseOut() {

    /*
    this function will:
    -change the background of mouseout pixel according to pen mode
    */
    
    let penmode = document.querySelector('input[name="penmode"]:checked').value;

    if (penmode === "trail" || penmode === "rainbow") {
        let color = getCanvasColor();
        this.style.transitionDuration ="0.5s"
        this.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    } else return;
}

function getCanvasColor() {

    /*
    this function will:
    -get canvas color slider values
    -return a color object with r,g,b elements
    */

    let red = +document.querySelector('.canvascolor input[name="red"]').value;
    let green = +document.querySelector('.canvascolor input[name="green"]').value;
    let blue = +document.querySelector('.canvascolor input[name="blue"]').value;

    let color = {r:red, g:green, b:blue};
    return color;
}

function getPenColor() {

    /*
    this function will:
    -get pen color slider values
    -return a color object with r,g,b elements
    */

    let red = +document.querySelector('.pencolor input[name="red"]').value;
    let green = +document.querySelector('.pencolor input[name="green"]').value;
    let blue = +document.querySelector('.pencolor input[name="blue"]').value;

    let color = {r:red, g:green, b:blue};
    return color;
}


/*
#rainbow:checked + label {
    background-image: gradient(to right,red,orangered,orange,gold, yellow,greenyellow,green);
    background-clip: text;
    -webkit-background-clip: text;
    color:transparent;
}
*/