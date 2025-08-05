export const handleLikeIcon = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

export const handleDeleteCard = (cardElement) => {
  cardElement.remove();
};

// Можно лучше - вынести клонирование темпейта в отдельную функцию (не обязательно)
const getTemplate = () => {
  return document.getElementById("card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

/* Можно лучше — обработчики можно и просто в аргументах передать, 
   но аккуратнее сделать через объект */
export const createCardElement = (
  data,
  { onPreviewPicture, onLikeIcon, onDeleteCard }
) => {
  const cardElement = getTemplate();
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__control-button_type_delete");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  // Можно лучше - проверять что обработчик передан, перед тем как его добавить.
  if (onLikeIcon) {
    likeButton.addEventListener("click", () => onLikeIcon(likeButton));
  }

  if (onDeleteCard) {
    deleteButton.addEventListener("click", () => onDeleteCard(cardElement));
  }

  if (onPreviewPicture) {
    cardImage.addEventListener("click", () => onPreviewPicture({name: data.name, link: data.link}));
  }

  return cardElement;
};