// Modal Elements
const modals = {
  edit: document.querySelector("#profile__bio_modal-container--edit"),
  add: document.querySelector("#profile__bio_modal-container-add"),
};

// Button Elements
const buttons = {
  openEdit: document.querySelector("#profile__bio-button--open"),
  closeEdit: document.querySelector("#profile__bio-button--close"),
  closeAdd: document.querySelector("#profile__bio-button--close-add"),
  save: document.querySelector(".profile__bio-button--save"),
  create: document.querySelector("#profile__bio-button--create"),
  delete: document.querySelector("card__delete-image"),
};

// Input Fields
const inputFields = {
  name: document.querySelector("#name"),
  aboutMe: document.querySelector("#aboutMe"),
  title: document.querySelector("#title"),
  image: document.querySelector("#imageUrl"),
};

// Profile Elements
let bioName = document.querySelector(".profile__bio_name").innerHTML;
let bioDescription = document.querySelector(
  ".profile__bio_description"
).innerHTML;
const savedName = document.querySelector(".profile__bio_name");
const savedAboutMe = document.querySelector(".profile__bio_description");

// Forms
const formEdit = document.querySelector(".profile__bio_form");
const formAdd = document.querySelector(".profile__bio_form2");

// Cards Container
const cardsContainer = document.querySelector(".cards");

// Utility Functions
function toggleModal(modal, isOpen) {
  if (isOpen) {
    modal.classList.add("profile__bio_modal-container--show");
  } else {
    modal.classList.remove("profile__bio_modal-container--show");
  }
}

function toggleButtonState(button, fields) {
  const isDisabled = fields.some((field) => field.value === "");
  button.disabled = isDisabled;
}

// Card Management
class CardManager {
  constructor(container) {
    this.container = container;
  }

  addCard(title, imageUrl) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__caption_title").textContent = title;
    cardElement.querySelector(".card__image").src = imageUrl;
    cardElement.querySelector(".card__image").alt = title;
    this.container.append(cardElement);
  }
}

const cardManager = new CardManager(cardsContainer);

// Initial Cards
const initialCards = [
  { name: "Yosemite Valley", link: "images/yosemite-image.png" },
  { name: "Lake Louise", link: "images/louise-image.png" },
  { name: "Bald Mountain", link: "images/montanas-image.png" },
  { name: "Latemar", link: "images/latemar-image.png" },
  { name: "Vanois Park", link: "images/vanois-image.png" },
  { name: "Lago di Braies", link: "images/lagos-image.png" },
];

initialCards.forEach((item) => cardManager.addCard(item.name, item.link));

// Event Listeners
buttons.openEdit.addEventListener("click", () =>
  toggleModal(modals.edit, true)
);
buttons.closeEdit.addEventListener("click", () =>
  toggleModal(modals.edit, false)
);
buttons.closeAdd.addEventListener("click", () =>
  toggleModal(modals.add, false)
);

inputFields.name.addEventListener("input", () =>
  toggleButtonState(buttons.save, [inputFields.name, inputFields.aboutMe])
);
inputFields.aboutMe.addEventListener("input", () =>
  toggleButtonState(buttons.save, [inputFields.name, inputFields.aboutMe])
);
inputFields.title.addEventListener("input", () =>
  toggleButtonState(buttons.create, [inputFields.title, inputFields.image])
);
inputFields.image.addEventListener("input", () =>
  toggleButtonState(buttons.create, [inputFields.title, inputFields.image])
);

// Initialize Input Fields with Saved Data
inputFields.name.value = bioName;
inputFields.aboutMe.value = bioDescription;

// Form Submission Handlers
function handleFormSubmit(form, callback) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    callback();
  });
}

handleFormSubmit(formEdit, () => {
  savedName.textContent = inputFields.name.value;
  savedAboutMe.textContent = inputFields.aboutMe.value;
  toggleModal(modals.edit, false);
});

handleFormSubmit(formAdd, () => {
  cardManager.addCard(inputFields.title.value, inputFields.image.value);
  toggleModal(modals.add, false);
});

buttons.openEdit.addEventListener("click", () => {
  inputFields.name.value = bioName;
  inputFields.aboutMe.value = bioDescription;
});

buttons.openCardForm = document
  .querySelector(".profile__bio_add")
  .addEventListener("click", () => {
    toggleModal(modals.add, true);
    inputFields.title.value = "";
    inputFields.image.value = "";
    toggleButtonState(buttons.create, [inputFields.title, inputFields.image]);
  });

cardsContainer.addEventListener("click", function (event) {
  // Check if the clicked element is the delete button or its child (like the icon image)
  if (event.target.closest(".card__delete-image")) {
    const cardElement = event.target.closest(".card");

    // Remove the card (delete it from the DOM)
    cardElement.remove();
  }

  // Check if the clicked element is the like button or its child
  if (event.target.closest(".card__caption-like_icon")) {
    // Find the closest card element to ensure correct context
    const cardElement = event.target.closest(".card");

    // Find the like button icon within this specific card
    const likeButtonIcon = cardElement.querySelector(
      ".card__caption-like_icon"
    );

    // Toggle the src attribute between the "like" and "unlike" images
    if (likeButtonIcon.src.includes("like-button_active.png")) {
      // If currently liked, unlike it
      likeButtonIcon.src = "images/like-button.png";
    } else {
      // If currently unliked, like it
      likeButtonIcon.src = "images/like-button_active.png";
    }
  }
});
