const config = {
  url: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "72a12bab-2ae0-4e7f-b7a7-608bd2c81fb1",
    "Content-Type": "application/json",
  },
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`API error: ${res.status}`);
};

const getInitialCards = () => {
  return fetch(`${config.url}/cards`, { headers: config.headers }).then((res) =>
    checkResponse(res)
  );
};

const addNewCardItem = (name, link) => {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then((res) => checkResponse(res));
};

const deleteCardItem = (cardId) => {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

const likeCardItem = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

const disLikeCardItem = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResponse(res));
};

const getUserProfile = () => {
  return fetch(`${config.url}/users/me`, { headers: config.headers }).then(
    (res) => checkResponse(res)
  );
};

const editUserProfile = (name, about) => {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then((res) => checkResponse(res));
};

const editUserAvatar = (avatar) => {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then((res) => checkResponse(res));
};

export {
  getInitialCards,
  getUserProfile,
  editUserProfile,
  addNewCardItem,
  deleteCardItem,
  likeCardItem,
  disLikeCardItem,
  editUserAvatar,
};
