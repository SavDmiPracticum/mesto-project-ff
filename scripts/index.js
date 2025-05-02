const cardTemplate = document.querySelector("#card-template").content;
const placeListElement = document.querySelector(".places__list");

const deleteCard = function (evt) {
  evt.target.closest(".places__item").remove();
};

function createCard(card, deleteOnClick) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const title = cardElement.querySelector(".card__title");

  cardImage.setAttribute("alt", card.name);
  cardImage.setAttribute("src", card.link);
  deleteButton.addEventListener("click", deleteOnClick);
  title.textContent = card.name;
  return cardElement;
}

function renderPlacesList() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard);
    placeListElement.append(cardElement);
  });
}

renderPlacesList();
