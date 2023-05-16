const slidesQuantity = 5;
const buttonPrev = document.querySelector('.prev');
const buttonNext = document.querySelector('.next');

const sliderLine = document.querySelector('.slider-line');
const dotWrapper = document.querySelector('.dot-wrapper');

let slideNumber = 0;
let prevNumber = 0;

function init(slidesQuantity) {
  for (let i = 0; i < slidesQuantity; i++) {
    const newSlide = document.createElement('div');
    newSlide.classList.add('slide');
    newSlide.innerHTML = i + 1;
    sliderLine.append(newSlide);
    const newDot = document.createElement('div');
    newDot.classList.add('dot');
    dotWrapper.append(newDot);
  }
}

init(slidesQuantity);
const sliderLineContent = sliderLine.innerHTML;

function dotActivation() {
  dots.forEach((el) => {
    el.classList.remove('active');
  });
  dots[slideNumber].classList.add('active');
}

const dots = document.querySelectorAll('.dot');
dots.forEach((element, index) => {
  element.addEventListener('click', () => {
    prevNumber = slideNumber;
    slideNumber = index;
    dotActivation();
    jumpToSlide();
  });
});
dotActivation();

function jumpToSlide() {
  let count = prevNumber;
  const step = Math.abs(prevNumber - slideNumber) / 50;
  if (prevNumber < slideNumber) {
    let timer = setInterval(function () {
      if (count >= slideNumber) {
        clearInterval(timer);
        return;
      }
      count += step;

      sliderLine.style.transform = `translate(${-count * 400}px)`;
    }, 20);
  } else {
    let timer = setInterval(function () {
      if (count <= slideNumber) {
        clearInterval(timer);
        return;
      }
      count -= step;
      sliderLine.style.transform = `translate(${-count * 400}px)`;
    }, 20);
  }
}

function goToNextSlide(clone = false) {
  buttonNext.disabled = true;
  let count = 0;
  const targetSlide = slideNumber;
  let timer = setInterval(function () {
    if (count >= 1) {
      buttonNext.disabled = false;
      if (clone) {
        sliderLine.style.transform = `translate(0px)`;
        sliderLine.innerHTML = sliderLineContent;
      }
      clearInterval(timer);
      return;
    }
    count += 0.02;
    sliderLine.style.transform = `translate(${
      -(targetSlide + count - 1) * 400
    }px)`;
  }, 20);
}

function goToPrevSlide(clone = false) {
  buttonPrev.disabled = true;
  let count = 1;
  let timer = setInterval(function () {
    if (count <= 0) {
      buttonPrev.disabled = false;
      if (clone) {
        sliderLine.style.transform = `translate(${-(slideNumber + count) * 400}px)`;
        sliderLine.innerHTML = sliderLineContent;
      }
      clearInterval(timer);
      return;
    }
    count -= 0.02;
    sliderLine.style.transform = `translate(${-(slideNumber + count) * 400}px)`;
  }, 20);
}

function cloneNextSlide() {
  const newSlide = document.createElement('div');
  newSlide.classList.add('slide');
  newSlide.innerHTML = document.querySelectorAll('.slide')[0].innerHTML;
  sliderLine.append(newSlide);
  goToNextSlide(true);
}

function clonePrevSlide() {
  const newSlide = document.createElement('div');
  newSlide.classList.add('slide');
  newSlide.innerHTML = document.querySelectorAll('.slide')[0].innerHTML;
  sliderLine.append(newSlide);
  sliderLine.style.transform = `translate(${-slidesQuantity * 400}px)`;
  goToPrevSlide(true);
}

buttonNext.addEventListener('click', () => {
  slideNumber++;
  if (slideNumber > slidesQuantity - 1) {
    cloneNextSlide();
    slideNumber = 0;
  } else {
    goToNextSlide();
  }
  dotActivation();
});

buttonPrev.addEventListener('click', () => {
  slideNumber--;
  if (slideNumber < 0) {
    clonePrevSlide();
    slideNumber = slidesQuantity - 1;
  } else {
    goToPrevSlide();
  }
  dotActivation();
});
