const cardTemplate = document.querySelector("#card-template").content;
const placeListElement = document.querySelector(".places__list");

const deleteOnClick = function (evt) {
  evt.target.closest(".places__item").remove();
};

function addCard(card, delOnClick) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const title = cardElement.querySelector(".card__title");

  cardImage.setAttribute("alt", card.name);
  cardImage.setAttribute("src", card.link);
  deleteButton.addEventListener("click", delOnClick);
  title.textContent = card.name;
  return cardElement;
}

function renderPlacesList() {
  initialCards.forEach((card) => {
    const cardElement = addCard(card, deleteOnClick);
    placeListElement.append(cardElement);
  });
}

renderPlacesList();
