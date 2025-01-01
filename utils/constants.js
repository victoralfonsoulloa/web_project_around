// Modal Elements
export const modals = {
  popup: document.querySelectorAll(".popup"),
  popupContainer: document.querySelectorAll(".popup__container"),
  edit: document.querySelector("#popup--edit"),
  form: document.querySelectorAll(".form"),
  add: document.querySelector("#popup-add"),
  imageContainer: document.querySelector(".popup__container-image"),
  image: document.querySelector("#popup_img"),
};

// Button Elements
export const buttons = {
  openEdit: document.querySelector("#popup__button--open"),
  closeEdit: document.querySelector("#popup__button--close"),
  closeAdd: document.querySelector("#popup__button--close-add"),
  save: document.querySelector(".form__button--save"),
  create: document.querySelector("#popup__button--create"),
  closeImage: document.querySelector("#popup__button--close-img"),
};

// Input Fields
export const inputFields = {
  name: document.querySelector("#name"),
  aboutMe: document.querySelector("#aboutMe"),
  title: document.querySelector("#title"),
  image: document.querySelector("#imageUrl"),
};

// Profile Elements
export let bioName = "Victor Alfonso"; // Default Name
export let bioDescription = "Software Engineer"; // Default Bio

// Elements to display the saved data
export const savedName = document.querySelector(".profile__bio_name");
export const savedAboutMe = document.querySelector(".profile__bio_description");

// Forms
export const formEdit = document.querySelector(".form--edit");
export const formAdd = document.querySelector(".form--add");

// Cards Container
export const cardsContainer = document.querySelector(".cards");

// Modal Image Elements
export const modalImage = modals.image.querySelector(".popup-picture");
export const modalCaption = modals.image.querySelector(".popup-caption");

// Initial Cards Data
export const initialCards = [
  { name: "Golden Gate Bridge", link: "images/golden-gate.jpg" },
  { name: "Sunsets in Seattle", link: "images/sunset-in-seattle.jpg" },
  { name: "Chautauqua Park", link: "images/chautauqua-park.jpg" },
  { name: "Lombard Street", link: "images/lombard-st.jpg" },
  { name: "Arizona Desert", link: "images/arizona.jpg" },
  { name: "Mile 9", link: "images/mile-9.jpg" },
];