// Button Elements
export const buttons = {
  openEdit: document.querySelector("#profile__bio-open-popup"),
  closeEdit: document.querySelector("#popup__button-close"),
  openAdd: document.querySelector(".profile__bio-add"),
  closeAdd: document.querySelector("#popup__button-close-add"),
  create: document.querySelector("#form__button-add"),
  closeImage: document.querySelector("#popup__button-close-img"),
};

// Input Fields
export const inputFields = {
  name: document.querySelector("#name"),
  aboutMe: document.querySelector("#aboutMe"),
  title: document.querySelector("#title"),
  image: document.querySelector("#imageUrl"),
};

// Forms
export const formEdit = document.querySelector("#form--edit");
export const formAdd = document.querySelector("#form--add");

// Initial Cards Data
export const initialCards = [
  { name: "Golden Gate Bridge", link: "images/golden-gate.jpg" },
  { name: "Sunsets in Seattle", link: "images/sunset-in-seattle.jpg" },
  { name: "Chautauqua Park", link: "images/chautauqua-park.jpg" },
  { name: "Lombard Street", link: "images/lombard-st.jpg" },
  { name: "Arizona Desert", link: "images/arizona.jpg" },
  { name: "Mile 9", link: "images/mile-9.jpg" },
];
