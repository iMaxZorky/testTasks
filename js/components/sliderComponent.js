class Slider {
  constructor(slidesQuantity) {
    this.main = null;
    this.slidesQuantity = slidesQuantity;
    this.buttonNext = null;
    this.buttonPrev = null;
    this.sliderLine = null;
    this.dotWrapper = null;
    this.sliderLineContent = null;

    this.targetSlide = null;
    this.slideNumber = 0;
    this.prevNumber = 0;
    this.init();
    this.dotWrapper.querySelector('.dot').classList.add('active');
  }

  init() {
    this.main = document.createElement('div');
    this.main.classList.add('slider-wrapper');

    this.sliderLine = document.createElement('div');
    this.sliderLine.classList.add('slider-line');

    this.dotWrapper = document.createElement('div');
    this.dotWrapper.classList.add('dot-wrapper');

    this.buttonNext = document.createElement('button');
    this.buttonNext.classList.add('button-slider'); 
    const spanNext = document.createElement('span');
    spanNext.classList.add('button-content');
    spanNext.innerHTML = `&#62;`;
    this.buttonNext.append(spanNext);
    this.buttonNext.addEventListener('click', () => {
      this.slideNumber++;
      if (this.slideNumber > this.slidesQuantity - 1) {
        this.cloneSlide('next');
        this.slideNumber = 0;
      } else {
        this.goToNextSlide();
      }
      this.dotActivation();
    });
    

    this.buttonPrev = document.createElement('button');
    this.buttonPrev.classList.add('button-slider');
    const spanPrev = document.createElement('span');
    spanPrev.classList.add('button-content');
    spanPrev.innerHTML = '&#60;';
    this.buttonPrev.append(spanPrev);
    this.buttonPrev.addEventListener('click', () => {
      this.slideNumber--;
      if (this.slideNumber < 0) {
        this.cloneSlide();
        this.slideNumber = this.slidesQuantity - 1;
      } else {
        this.goToPrevSlide();
      }
      this.dotActivation();
    });



    for (let i = 0; i < this.slidesQuantity; i++) {
      const newSlide = document.createElement('div');
      newSlide.classList.add('slide');
      newSlide.innerHTML = i + 1;
      this.sliderLine.append(newSlide);
      const newDot = document.createElement('div');
      newDot.classList.add('dot');
      newDot.addEventListener('click', () => {
        this.prevNumber = this.slideNumber;
        this.slideNumber = i;
        this.dotActivation();
        this.jumpToSlide();
      });
      this.dotWrapper.append(newDot);
    }
    
    const sliderWindow = document.createElement('div');
    sliderWindow.classList.add('slider-window');
    sliderWindow.append(this.sliderLine);
    const slider = document.createElement('div');
    slider.classList.add('slider');
    slider.append(this.buttonPrev);
    slider.append(sliderWindow);
    slider.append(this.buttonNext);
    this.main.append(slider);
    this.main.append(this.dotWrapper);

    this.sliderLineContent = this.sliderLine.innerHTML;
    return this.main;
  }

  dotActivation() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((el) => {
      el.classList.remove('active');
    });
    dots[this.slideNumber].classList.add('active');
  }
  
  cloneSlide(direction) {
    const newSlide = document.createElement('div');
    newSlide.classList.add('slide');
    newSlide.innerHTML = document.querySelectorAll('.slide')[0].innerHTML;
    this.sliderLine.append(newSlide);
    if (direction == 'next') {
      this.goToNextSlide(true);
    } else {
      this.sliderLine.style.transform = `translate(${-this.slidesQuantity * (400 + 10)}px)`;
      this.goToPrevSlide(true);
    }
  }
  
  jumpToSlide() {
    let count = this.prevNumber;
    const step = Math.abs(this.prevNumber - this.slideNumber) / 50;
    if (this.prevNumber < this.slideNumber) {
      let timer = setInterval(() => {
        count += step;
        if (count > this.slideNumber) {
          this.sliderLine.style.transform = `translate(${-this.slideNumber * (400 + 10)}px)`;
          clearInterval(timer);
          return;
        }
        this.sliderLine.style.transform = `translate(${-count * (400 + 10)}px)`;
      }, 20);
    } else {
      let timer = setInterval(() => {
        if (count <= this.slideNumber) {
          this.sliderLine.style.transform = `translate(${-this.slideNumber * (400 + 10)}px)`;
          clearInterval(timer);
          return;
        }
        count -= step;
        this.sliderLine.style.transform = `translate(${-count * (400 + 10)}px)`;
      }, 20);
    }
  }
  
  goToNextSlide(clone = false) {
    this.buttonNext.disabled = true;
    let count = 0;
    this.targetSlide = this.slideNumber;
    let timer = setInterval(() => {
      if (count >= 1) {
        this.buttonNext.disabled = false;
        if (clone) {
          this.sliderLine.style.transform = `translate(0px)`;
          this.sliderLine.innerHTML = this.sliderLineContent;
        }
        clearInterval(timer);
        return;
      }
      count += 0.02;
      this.sliderLine.style.transform = `translate(${-(this.targetSlide + count - 1) * (400 + 10)}px)`;
    }, 20);
  }
  
  goToPrevSlide(clone = false) {
    this.buttonPrev.disabled = true;
    let count = 1;
    let timer = setInterval(() => {
      if (count <= 0) {
        this.buttonPrev.disabled = false;
        if (clone) {
          this.sliderLine.style.transform = `translate(${-(this.slideNumber + count) * (400 + 10)}px)`;
          this.sliderLine.innerHTML = this.sliderLineContent;
        }
        clearInterval(timer);
        return;
      }
      count -= 0.02;
      this.sliderLine.style.transform = `translate(${-(this.slideNumber + count) * (400 + 10)}px)`;
    }, 20);
  }

}

export default Slider