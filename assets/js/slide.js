// slide area
let totalslides = document.querySelectorAll('.slide-bg').length;
let slidesWidth = document.querySelector('.slide-bg').clientWidth;
let slidesHeight = document.querySelector('.slides').clientHeight;
document.querySelector('.slide-bg').style.width = `calc(${slidesWidth} * ${totalslides})`;
document.querySelector('.controls').style.height = `${slidesHeight}`;

setInterval(next,4000);

    // functions

function prev() {
    currentSlide--;
if(currentSlide < 0){
    currentSlide = totalslides - 1;
}
updateSlide();
}

function next () {
currentSlide++;
if(currentSlide == totalslides){
    currentSlide = 0 ;
}
updateSlide();
}


function updateSlide () {
    c('.slide-width').style.marginLeft=`calc(-${slidesWidth}px * ${currentSlide})`;
}