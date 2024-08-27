const open = document.querySelector("#profile__bio-button--open");
const modalContainer = document.querySelector("#profile__bio_modal-container");
const close = document.querySelector("#profile__bio-button--close");

open.addEventListener("click", () => {
  modalContainer.classList.add("profile__bio_modal-container--show");
});

close.addEventListener("click", () => {
  modalContainer.classList.remove("profile__bio_modal-container--show");
});

const saveButton = document.querySelector(".profile__bio-button--save");

if (document.querySelector(".profile__bio_form-input").value === "") {
  saveButton.setAttribute("disabled", true);
}

const saveButton2 = document.querySelector(".save-button");
const inputFieldName = document.querySelector("#name");
const inputFieldAboutMe = document.querySelector("#aboutMe");

function toggleButtonState() {
  if (inputFieldName.value === "" || inputFieldAboutMe.value === "") {
    saveButton2.setAttribute("disabled", true);
  } else {
    saveButton2.removeAttribute("disabled");
  }
}

// Add event listener to input field
inputFieldName.addEventListener("input", toggleButtonState);
inputFieldAboutMe.addEventListener("input", toggleButtonState);
