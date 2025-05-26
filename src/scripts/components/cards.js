const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, deleteOnClick, likeOnClick, cardOnClick) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const title = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.setAttribute("alt", card.name);
  cardImage.setAttribute("src", card.link);
  deleteButton.addEventListener("click", () => deleteOnClick(cardElement));
  likeButton.addEventListener("click", () => likeOnClick(likeButton));
  cardImage.addEventListener("click", () => cardOnClick(cardImage, title));
  title.textContent = card.name;
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(cardElement) {
  cardElement.classList.toggle("card__like-button_is-active");
}

export { initialCards, createCard, deleteCard, likeCard };
