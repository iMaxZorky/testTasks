const cookieMessage = document.querySelector('.cookie');
const cookieButton = document.querySelector('.cookie__button');

cookieButton.addEventListener('click', ()=>{
    cookieMessage.classList.remove('_show');
});
setTimeout(() => cookieMessage.classList.add('_show'), 2000);

const feedbackForm = document.forms.feedback;
const inputs = [...feedbackForm.elements].slice(0, -1);


console.log(inputs)

const placeholders = [];
inputs.forEach((input, index) => {
    placeholders.push(input.placeholder);
    input.addEventListener("focus", () => {
            input.placeholder = '';
        })
        input.addEventListener("blur", () => {
            input.placeholder = placeholders[index];
        })
});

