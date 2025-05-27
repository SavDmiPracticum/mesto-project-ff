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

export { createCard, deleteCard, likeCard };