import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';
const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('.feedback-form input'),
};
let formData = {};

populateTextarea();

refs.form.addEventListener('input', throttle(onTextareaInput, 500));

refs.form.addEventListener('submit', onFormSubmit)

function onFormSubmit(event) {
    console.log(formData);
    event.preventDefault();
    event.currentTarget.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    formData = {};
};

function onTextareaInput(event) {
    formData[event.target.name] = event.target.value;
    const formDataString = JSON.stringify(formData);
    localStorage.setItem(LOCAL_STORAGE_KEY, formDataString);
}

function populateTextarea() {
    const savedMessage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (!savedMessage) {
        return;
    }
    refs.textarea.value = savedMessage['message'] || '';
    refs.input.value = savedMessage['email'] || '';
}