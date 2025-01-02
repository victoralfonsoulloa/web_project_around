// Button Elements
export const buttons = {
  openEdit: document.querySelector("#popup__button--open"),
  closeEdit: document.querySelector("#popup__button--close"),
  openAdd: document.querySelector(".profile__bio_add"),
  closeAdd: document.querySelector("#popup__button--close-add"),
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
export const bioData = {
  bioName: 'Victor Alfonso', // Initialize with default values
  bioDescription: 'Software Engineer'
};

// Forms
export const formEdit = document.querySelector(".form--edit");
export const formAdd = document.querySelector(".form--add");

// Cards Container
export const cardsContainer = document.querySelector(".cards");

// Initial Cards Data
export const initialCards = [
  { name: "Golden Gate Bridge", link: "images/golden-gate.jpg" },
  { name: "Sunsets in Seattle", link: "images/sunset-in-seattle.jpg" },
  { name: "Chautauqua Park", link: "images/chautauqua-park.jpg" },
  { name: "Lombard Street", link: "images/lombard-st.jpg" },
  { name: "Arizona Desert", link: "images/arizona.jpg" },
  { name: "Mile 9", link: "images/mile-9.jpg" },
];