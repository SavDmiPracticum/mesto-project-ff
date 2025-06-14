let validationConfig;

const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

const showInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const checkInputValidity = (form, input) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputs, button) => {
  if (hasInvalidInput(inputs)) {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const setEventListener = (form) => {
  const inputs = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const button = form.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputs, button);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input);
      toggleButtonState(inputs, button);
    });
  });
};

const enableValidation = (validationConfigIn) => {
  validationConfig = validationConfigIn;
  const forms = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListener(form);
  });
};

const clearValidation = (form, validationConfigIn) => {
  const inputs = Array.from(
    form.querySelectorAll(validationConfigIn.inputSelector)
  );
  inputs.forEach((input) => {
    hideInputError(form, input);
  });
};

export { enableValidation, clearValidation };
