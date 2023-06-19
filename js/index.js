const cookieMessage = document.querySelector(".cookie");
const cookieButton = document.querySelector(".cookie__button");

const feedbackForm = document.forms.feedback;
const inputs = [...feedbackForm.elements].slice(0, -1);
const placeholders = [];
let emptyFieldsExistence;

const ourMissionBlock = document.querySelector('.our-mission')
const tBlock = document.querySelector('.our-mission__text-block')
const phoneImage = document.querySelector('.our-mission__phone-image')

cookieButton.addEventListener("click", () => {
  cookieMessage.classList.remove("_show");
});
setTimeout(() => cookieMessage.classList.add("_show"), 2000);

inputs.forEach((input, index) => {
  placeholders.push(input.placeholder);
  input.addEventListener("focus", () => {
    input.placeholder = "";
  });
  input.addEventListener("blur", () => {
    input.placeholder = placeholders[index];
  });
  input.addEventListener("input", () => {
    input.classList.remove("_empty");
  });
});

feedbackForm.addEventListener("submit", function (event) {
  emptyFieldsExistence = false;
  event.preventDefault(); //отключаем стандартную отправку формы, чтобы страница не перезагружалась
  inputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("_empty");
      emptyFieldsExistence = true;
    }
  });
  if (!emptyFieldsExistence) {
    alert("Form sent");
    //отправляем форму собственным методом
  }
});



function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

function animationByScroll () {
  const ourMissionBlockHeight = ourMissionBlock.offsetHeight;
  const ourMissionBlockOffset = offset(ourMissionBlock).top;

  let animPoint = window.innerHeight - ourMissionBlockHeight;

  if (pageYOffset > (ourMissionBlockOffset - animPoint) && pageYOffset < (ourMissionBlockOffset + ourMissionBlockHeight)) {
    tBlock.classList.add('_hide');
    phoneImage.classList.add('_move');
  } else {
    tBlock.classList.remove('_hide');
    phoneImage.classList.remove('_move');
  }
}

window.addEventListener('scroll', animationByScroll);
