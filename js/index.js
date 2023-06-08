const cookieMessage = document.querySelector(".cookie");
const cookieButton = document.querySelector(".cookie__button");

const feedbackForm = document.forms.feedback;
const inputs = [...feedbackForm.elements].slice(0, -1);
const placeholders = [];
let emptyFieldsExistance;

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
  emptyFieldsExistance = false;
  event.preventDefault(); //отключаем стандартную отправку формы, чтобы страница не перезагружалась
  inputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("_empty");
      emptyFieldsExistance = true;
    }
  });
  if (!emptyFieldsExistance) {
    alert("Form sent");
    //отправляем форму собственным методом
  }
});
