
// Get the amount of slides
let totalSlides = document.querySelectorAll('.slider-item').length;
// Set initial slide
let currentSlide = 0;

// Set slider width
document.querySelector('.slider-width').style.width = `calc(100vw * ${totalSlides})`;
// Set slider controls height
document.querySelector('.slider-controls').style.height = `${document.querySelector('.slider').clientHeight}px`;

function goPrevSlide() {
    // Prev slide
    currentSlide--;
    // Go to last slide if current slide is first
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    updateSlider();
}

function goNextSlide() {
    // Next slide
    currentSlide++;
    // Go to first slide if current slide is last
    if (currentSlide > (totalSlides - 1)) {
        currentSlide = 0
    }
    updateSlider();
}

function updateSlider() {
    let sliderItemWidth = document.querySelector('.slider-item').clientWidth;
    let newMargin = (currentSlide * sliderItemWidth);

    // Sets the margin showing the current slide
    document.querySelector('.slider-width').style.marginLeft = `-${newMargin}px`;
}

// Set time interval to next slide
setInterval(goNextSlide, 10000);