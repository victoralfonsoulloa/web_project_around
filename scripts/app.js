// Modal Elements
const modals = {
  edit: document.querySelector("#profile__bio_modal-container--edit"),
  add: document.querySelector("#profile__bio_modal-container-add"),
  image: document.querySelector("#profile__bio_modal-container_img"),
};

// Button Elements
const buttons = {
  openEdit: document.querySelector("#profile__bio-button--open"),
  closeEdit: document.querySelector("#profile__bio-button--close"),
  closeAdd: document.querySelector("#profile__bio-button--close-add"),
  save: document.querySelector(".profile__bio-button--save"),
  create: document.querySelector("#profile__bio-button--create"),
  closeImage: document.querySelector("#profile__bio-button--close-img"),
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

// Modal Image Elements
const modalImage = modals.image.querySelector(
  ".profile__bio_modal-container-picture"
);
const modalCaption = modals.image.querySelector(
  ".profile__bio_modal-container-caption"
);

// Initial Cards Data
const initialCards = [
  { name: "Golden Gate Bridge", link: "images/golden-gate.jpg" },
  { name: "Sunsets in Seattle", link: "images/sunset-in-seattle.jpg" },
  { name: "Chautauqua Park", link: "images/chautauqua-park.jpg" },
  { name: "Lombard Street", link: "images/lombard-st.jpg" },
  { name: "Arizona Desert", link: "images/arizona.jpg" },
  { name: "Mile 9", link: "images/mile-9.jpg" },
];

// Utility Functions
function toggleModal(modal, isOpen) {
  modal.classList.toggle("profile__bio_modal-container--show", isOpen);
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
    const imageElement = cardElement.querySelector(".card__image");

    cardElement.querySelector(".card__caption_title").textContent = title;
    imageElement.src = imageUrl;
    imageElement.alt = title;
    imageElement.setAttribute("data-caption", title);
    this.container.append(cardElement);
  }
}

const cardManager = new CardManager(cardsContainer);

// Populate Initial Cards
initialCards.forEach((item) => cardManager.addCard(item.name, item.link));

// Event Listeners

// Profile Bio Modal Event Listeners
buttons.openEdit.addEventListener("click", () => {
  inputFields.name.value = bioName;
  inputFields.aboutMe.value = bioDescription;
  toggleModal(modals.edit, true);
});

buttons.closeEdit.addEventListener("click", () =>
  toggleModal(modals.edit, false)
);
buttons.closeAdd.addEventListener("click", () =>
  toggleModal(modals.add, false)
);

// Form Validation Event Listeners
[inputFields.name, inputFields.aboutMe].forEach((field) =>
  field.addEventListener("input", () =>
    toggleButtonState(buttons.save, [inputFields.name, inputFields.aboutMe])
  )
);

[inputFields.title, inputFields.image].forEach((field) =>
  field.addEventListener("input", () =>
    toggleButtonState(buttons.create, [inputFields.title, inputFields.image])
  )
);

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

// Add Card Modal Event Listener
document.querySelector(".profile__bio_add").addEventListener("click", () => {
  toggleModal(modals.add, true);
  inputFields.title.value = "";
  inputFields.image.value = "";
  toggleButtonState(buttons.create, [inputFields.title, inputFields.image]);
});

// Handle Card Click Events
cardsContainer.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("card__image")) {
    // Show image modal
    modalImage.src = target.src;
    modalCaption.textContent = target.getAttribute("data-caption");
    toggleModal(modals.image, true);
  }

  if (target.closest(".card__delete-image")) {
    target.closest(".card").remove();
  }

  if (target.closest(".card__caption-like_icon")) {
    const likeButtonIcon = target
      .closest(".card")
      .querySelector(".card__caption-like_icon");
    likeButtonIcon.src = likeButtonIcon.src.includes("like-button_active.png")
      ? "images/like-button.png"
      : "images/like-button_active.png";
  }
});

// Image Modal Close Button Event Listener
buttons.closeImage.addEventListener("click", () =>
  toggleModal(modals.image, false)
);
