import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { toggleButtonState } from "../utils/utils.js";
import {
  buttons,
  inputFields,
  cardsContainer,
  initialCards,
  bioData
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Create UserInfo instance
const userInfo = new UserInfo('.profile__bio_name','.profile__bio_description');


// Create instances of PopupWithForm
const editPopup = new PopupWithForm('#popup--edit', (formData) => {
  bioData.bioName = formData.name;
  bioData.bioDescription = formData.aboutMe;
  userInfo.setUserInfo(formData.name, formData.aboutMe)
});

const addPopup = new PopupWithForm('#popup-add', (formData) => {
  const formCardHandler = new Card(
    formData.title,
    formData.image,
    "#card-template"
  );
  const formCardInstance = formCardHandler.generateCard();
  cardList.addItem(formCardInstance);
});

editPopup.setEventListeners();
addPopup.setEventListeners();

// Create instance of PopupWithImage
const imagePopup = new PopupWithImage('#popup_img');
imagePopup.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardHandler = new Card(
        cardItem.name,
        cardItem.link,
        "#card-template"
      );
      const cardInstance = cardHandler.generateCard();
      cardList.addItem(cardInstance);
    },
  },
  ".cards"
);

cardList.renderItems();

// Event listeners for opening and closing edit popup
buttons.openEdit.addEventListener("click", () => {
  inputFields.name.value = bioData.bioName;
  inputFields.aboutMe.value = bioData.bioDescription;
  editPopup.open();
});

buttons.closeEdit.addEventListener("click", (event) => {
  event.preventDefault();
  inputFields.name.value = bioData.bioName;
  inputFields.aboutMe.value = bioData.bioDescription;
  editPopup.close();
});

// Event listener for opening and closing add popup
buttons.openAdd.addEventListener("click", () => {
  addPopup.open();
  inputFields.title.value = "";
  inputFields.image.value = "";
  toggleButtonState(buttons.create, [inputFields.title, inputFields.image]);
});

buttons.closeAdd.addEventListener("click", () => {
  addPopup.close();
});

// Event listener for card interactions
// Delete Card and Open card popup
cardsContainer.addEventListener("click", function (event) {
  const target = event.target;

  if (target.classList.contains("card__image")) {
    imagePopup.open(target.src, target.getAttribute("data-caption"));
  }

  if (target.closest(".card__delete-image")) {
    target.closest(".card").remove();
  }
});

// Event listener for closing image popup
buttons.closeImage.addEventListener("click", () => {
  imagePopup.close();
});

// Configuration object for form validation
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit",
  inactiveButtonClass: "form__button-inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

// Enable form validation
const forms = document.querySelectorAll(validationConfig.formSelector);

forms.forEach((formElement) => {
  const validator = new FormValidator(validationConfig, formElement);
  validator.enableValidation();
});