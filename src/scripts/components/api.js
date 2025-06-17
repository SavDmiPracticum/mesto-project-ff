const config = {
  url: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "72a12bab-2ae0-4e7f-b7a7-608bd2c81fb1",
    "Content-Type": "application/json",
  },
};

const getInitialCards = () => {
  return fetch(`${config.url}/cards`, { headers: config.headers }).then(
    (res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error initialize cards: ${res.status}`);
      }
    }
  );
};

const addNewCardItem = (name, link) => {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error adding card: ${res.status}`);
    }
  });
};

const deleteCardItem = (cardId) => {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (!res.ok) return Promise.reject(`Error deleting card: ${res.status}`);
  });
};

const likeCardItem = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error liking card: ${res.status}`);
    }
  });
};

const disLikeCardItem = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error liking card: ${res.status}`);
    }
  });
};

const getUserProfile = () => {
  return fetch(`${config.url}/users/me`, { headers: config.headers }).then(
    (res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error getting user: ${res.status}`);
      }
    }
  );
};

const editUserProfile = (name, about) => {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ name, about }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error editing user: ${res.status}`);
    }
  });
};

const editUserAvatar = (avatar) => {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error editing avatar: ${res.status}`);
    }
  });
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
