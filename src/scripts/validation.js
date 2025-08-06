const isValid = (inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, settings, inputElement.validationMessage);
  } else {
    hideInputError(inputElement, settings);
  }
};

const showInputError = (inputElement, settings, errorMessage) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add(settings.inputErrorClass);
  if (inputElement.validity.patternMismatch) {
    errorMessage = inputElement.dataset.errorMessage || errorMessage;
  }
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

const hideInputError = (inputElement, settings) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
};

const isFormValid = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  return inputList.every((inputElement) => inputElement.validity.valid);
}

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButtonElement = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(inputElement, settings);     
      if (isFormValid(formElement, settings)) {
        submitButtonElement.classList.remove(settings.inactiveButtonClass);
      } else {
        submitButtonElement.classList.add(settings.inactiveButtonClass);
      }
    });
  });
};


export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

export const clearValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(inputElement, settings);
  });
  const submitButtonElement = formElement.querySelector(settings.submitButtonSelector);
  submitButtonElement.classList.add(settings.inactiveButtonClass);
};
