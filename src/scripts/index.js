import "../pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getInitialCards,
  getUserProfile,
  editUserProfile,
  addNewCardItem,
  deleteCardItem,
  likeCardItem,
  disLikeCardItem,
  editUserAvatar,
} from "./components/api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const placeListElement = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");
const popupClose = document.querySelectorAll(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
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

const avatarForm = document.querySelector('form[name="new-avatar"]');
const avatarPopup = document.querySelector(".popup_type_new-avatar");
const avatarFormLink = document.querySelector(".popup__input_type_avatar_url");

const onDeleteCard = (cardElement, cardId) => {
  deleteCardItem(cardId).catch((err) => console.log(err));
  deleteCard(cardElement);
};

const onLikeCard = (likeButton, cardId, likeNumber) => {
  const cardIsLiked = likeButton.classList.contains(
    "card__like-button_is-active"
  );
  if (cardIsLiked) {
    disLikeCardItem(cardId)
      .then((updatedCard) => {
        likeCard(likeButton, likeNumber, updatedCard);
      })
      .catch((err) => console.log(err));
  } else {
    likeCardItem(cardId)
      .then((updatedCard) => {
        likeCard(likeButton, likeNumber, updatedCard);
      })
      .catch((err) => console.log(err));
  }
};

const onClickCard = (cardImage, title) => {
  popupImageSrc.src = cardImage.src;
  popupImageSrc.alt = cardImage.alt;
  popupImageCaption.textContent = title.textContent;
  openModal(popupImage);
};

const renderLoading = (popupButton, isLoading) => {
  if (isLoading) {
    popupButton.textContent = "Сохранение...";
  } else {
    popupButton.textContent = "Сохранить";
  }
};

const onFormEditSubmit = (evt) => {
  evt.preventDefault();
  const popupButton = editForm.querySelector(".popup__button");
  renderLoading(popupButton, true);
  editUserProfile(editFormName.value, editFormDesc.value)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDesc.textContent = result.about;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => renderLoading(popupButton, false));
  closeModal(evt.target.closest(".popup"));
};

const onFormAddSubmit = (evt) => {
  evt.preventDefault();
  const popupButton = addForm.querySelector(".popup__button");
  renderLoading(popupButton, true);
  Promise.all([
    addNewCardItem(addFormName.value, addFormLink.value),
    getUserProfile(),
  ])
    .then(([card, user]) => {
      const newCardElement = createCard(
        card,
        user,
        onDeleteCard,
        onLikeCard,
        onClickCard
      );
      placeListElement.prepend(newCardElement);
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(popupButton, false));
  addForm.reset();
  closeModal(evt.target.closest(".popup"));
};

const onFormAvatarSubmit = (evt) => {
  evt.preventDefault();
  const popupButton = avatarForm.querySelector(".popup__button");
  renderLoading(popupButton, true);
  editUserAvatar(avatarFormLink.value)
    .then((user) => {
      profileAvatar.style = `background-image: url(${user.avatar})`;
    })
    .catch((err) => console.log(err))
    .finally(() => renderLoading(popupButton, false));
  avatarForm.reset();
  closeModal(evt.target.closest(".popup"));
};

popupClose.forEach((cross) => {
  cross.addEventListener("click", (evt) => {
    closeModal(evt.target.closest(".popup"));
  });
});

profileEditButton.addEventListener("click", () => {
  clearValidation(editForm, validationConfig);
  editFormName.value = profileTitle.textContent;
  editFormDesc.value = profileDesc.textContent;
  openModal(profileEditPopup);
});

profileAddButton.addEventListener("click", () => {
  addForm.reset();
  clearValidation(addForm, validationConfig);
  openModal(profileAddPopup);
});

profileAvatar.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

editForm.addEventListener("submit", onFormEditSubmit);
addForm.addEventListener("submit", onFormAddSubmit);
avatarPopup.addEventListener("submit", onFormAvatarSubmit);

const renderUserProfile = () => {
  getUserProfile()
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDesc.textContent = user.about;
      profileAvatar.style = `background-image: url(${user.avatar})`;
    })
    .catch((err) => {
      console.log(err);
    });
};

const renderPlacesList = () => {
  Promise.all([getUserProfile(), getInitialCards()])
    .then(([user, cards]) => {
      cards.forEach((card) => {
        const cardElement = createCard(
          card,
          user,
          onDeleteCard,
          onLikeCard,
          onClickCard
        );
        placeListElement.append(cardElement);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

renderUserProfile();
renderPlacesList();
enableValidation(validationConfig);
