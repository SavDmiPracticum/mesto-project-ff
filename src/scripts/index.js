import "../pages/index.css";
import { initialCards } from "./components/cards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";

const placeListElement = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const popupClose = document.querySelectorAll(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const editForm = document.querySelector('form[name="edit-profile"]');
const editFormName = document.querySelector(".popup__input_type_name");
const editFormDesc = document.querySelector(".popup__input_type_description");

const profileAddButton = document.querySelector(".profile__add-button");
const profileAddPopup = document.querySelector(".popup_type_new-card");
const addForm = document.querySelector('form[name="new-place"]');
const addFormName = document.querySelector(".popup__input_type_card-name");
const addFormLink = document.querySelector(".popup__input_type_url");

const popupImage = document.querySelector(".popup_type_image");
const popupImageSrc = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

const onDeleteCard = (cardElement) => {
  deleteCard(cardElement);
};

const onLikeCard = (likeButton) => {
  likeCard(likeButton);
};

const onClickCard = (cardImage, title) => {
  popupImageSrc.src = cardImage.src;
  popupImageSrc.alt = cardImage.alt;
  popupImageCaption.textContent = title.textContent;
  openModal(popupImage);
};

const onFormEditSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = editFormName.value;
  profileDesc.textContent = editFormDesc.value;
  closeModal(evt.target.closest(".popup"));
};

const onFormAddSubmit = (evt) => {
  evt.preventDefault();
  let newCard = {
    name: addFormName.value,
    link: addFormLink.value,
  };
  const newCardElement = createCard(
    newCard,
    onDeleteCard,
    onLikeCard,
    onClickCard
  );
  placeListElement.prepend(newCardElement);
  addForm.reset();
  closeModal(evt.target.closest(".popup"));
};

popupClose.forEach((cross) => {
  cross.addEventListener("click", (evt) => {
    closeModal(evt.target.closest(".popup"));
  });
});

profileEditButton.addEventListener("click", () => {
  clearValidation(editForm, { inputSelector: ".popup__input"});
  editFormName.value = profileTitle.textContent;
  editFormDesc.value = profileDesc.textContent;
  openModal(profileEditPopup);
});

profileAddButton.addEventListener("click", () => {
  addForm.reset();
  clearValidation(addForm, { inputSelector: ".popup__input"});
  openModal(profileAddPopup);
});

editForm.addEventListener("submit", onFormEditSubmit);

addForm.addEventListener("submit", onFormAddSubmit);

function renderPlacesList() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card, onDeleteCard, onLikeCard, onClickCard);
    placeListElement.append(cardElement);
  });
}

renderPlacesList();

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
