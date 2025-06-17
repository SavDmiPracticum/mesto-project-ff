const cardTemplate = document.querySelector("#card-template").content;

function createCard(card, userId, deleteOnClick, likeOnClick, cardOnClick) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const title = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeNumber = cardElement.querySelector(".card__like-number");

  cardImage.setAttribute("alt", card.name);
  cardImage.setAttribute("src", card.link);
  if (card.owner._id === userId) {
    deleteButton.addEventListener("click", () =>
      deleteOnClick(cardElement, card._id)
    );
    deleteButton.classList.add("card__delete-button-is_active");
  }
  likeButton.addEventListener("click", () =>
    likeOnClick(likeButton, card._id, likeNumber)
  );
  cardImage.addEventListener("click", () => cardOnClick(cardImage, title));
  title.textContent = card.name;
  likeNumber.textContent = card.likes.length;
  if (card.likes.some((likeUser) => likeUser._id === userId)) {
    likeButton.classList.toggle("card__like-button_is-active");
  }
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(cardElement, likeNumberElement, updatedCard) {
  likeNumberElement.textContent = updatedCard.likes.length;
  cardElement.classList.toggle("card__like-button_is-active");
}

export { createCard, deleteCard, likeCard };
