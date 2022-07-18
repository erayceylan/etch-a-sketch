console.log("hello me again");

const canvas = document.querySelector(".canvas");
console.log(canvas);

const pixels = [];

for (let i = 0; i < 256; i++) {
    pixels[i] = document.createElement("div");
    pixels[i].style.width = "16px"
    pixels[i].style.height = "16px"
};

console.log(pixels);

pixels.forEach( pixel => {canvas.appendChild(pixel);});
pixels.forEach( pixel => pixel.addEventListener('mouseover',mouseOver));
pixels.forEach( pixel => pixel.addEventListener('mouseout',mouseOut));


function mouseOver() {
    this.style.transitionDuration ="0.05s"
    this.style.backgroundColor = "white"
}

function mouseOut() {
    this.style.transitionDuration ="0.5s"
    this.style.backgroundColor ="green"
}

