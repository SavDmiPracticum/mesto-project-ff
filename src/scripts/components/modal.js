const onEscape = (evt) => {
  if (evt.key == "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};

const onClickExit = (evt) => {
  if (evt.target === document.querySelector(".popup_is-opened")) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};

function openModal(popUpElement) {
  popUpElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", onEscape);
  document.addEventListener("click", onClickExit);
}

function closeModal(popUpElement) {
  popUpElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", onEscape);
  document.removeEventListener("click", onClickExit);
}

export { openModal, closeModal };
