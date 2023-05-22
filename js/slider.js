import Slider from './components/sliderComponent.js'


document.body.prepend(new Slider(5).main);
document.body.prepend(document.createElement('h1'));
document.querySelector('h1').innerHTML = 'Slider';
