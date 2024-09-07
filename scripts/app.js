const open = document.querySelector("#profile__bio-button--open");
const close = document.querySelector("#profile__bio-button--close");
const modalContainer = document.querySelector("#profile__bio_modal-container");
const saveButton = document.querySelector(".profile__bio-button--save");
const inputFieldName = document.querySelector("#name");
const inputFieldAboutMe = document.querySelector("#aboutMe");
let bioName = document.querySelector(".profile__bio_name").innerHTML;
let bioDescription = document.querySelector(
  ".profile__bio_description"
).innerHTML;
const form = document.querySelector(".profile__bio_form");
const savedName = document.querySelector(".profile__bio_name");
const savedAboutMe = document.querySelector(".profile__bio_description");
const cardsContainer = document.querySelector(".cards");

open.addEventListener("click", () => {
  modalContainer.classList.add("profile__bio_modal-container--show");
});

close.addEventListener("click", () => {
  modalContainer.classList.remove("profile__bio_modal-container--show");
});

if (document.querySelector(".profile__bio_form-input").value === "") {
  saveButton.setAttribute("disabled", true);
}

function toggleButtonState() {
  if (inputFieldName.value === "" || inputFieldAboutMe.value === "") {
    saveButton.setAttribute("disabled", true);
  } else {
    saveButton.removeAttribute("disabled");
  }
}

inputFieldName.addEventListener("input", toggleButtonState);
inputFieldAboutMe.addEventListener("input", toggleButtonState);

inputFieldName.value = bioName;
inputFieldAboutMe.value = bioDescription;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  savedName.textContent = inputFieldName.value;
  savedAboutMe.textContent = inputFieldAboutMe.value;

  modalContainer.classList.remove("profile__bio_modal-container--show");
});

function addCard(cardTitle, cardImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__caption_title").textContent = cardTitle;
  cardElement.querySelector(".card__image").src = cardImage;
  cardElement.querySelector(".card__image").alt = cardTitle;
  cardsContainer.append(cardElement);
}

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "images/yosemite-image.png",
  },
  {
    name: "Lake Louise",
    link: "images/louise-image.png",
  },
  {
    name: "Bald Mountain",
    link: "images/montanas-image.png",
  },
  {
    name: "Latemar",
    link: "images/latemar-image.png",
  },
  {
    name: "Vanois Park",
    link: "images/vanois-image.png",
  },
  {
    name: "Lago di Braies",
    link: "images/lagos-image.png",
  },
];

for (const item of initialCards) {
  addCard(item.name, item.link);
}
