import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { toggleButtonState } from "../utils/utils.js";
import { buttons, inputFields, initialCards } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Function for Opening popup image
function handleCardClick(imageUrl, title) {
  imagePopup.open(imageUrl, title);
}

// Create UserInfo instance
const userInfo = new UserInfo(
  ".profile__bio-name",
  ".profile__bio-description"
);

// Create instances of PopupWithForm
const editPopup = new PopupWithForm("#popup--edit", (formData) => {
  userInfo.setUserInfo(formData.name, formData.aboutMe);
});

const addPopup = new PopupWithForm("#popup-add", (formData) => {
  const formCardHandler = new Card(
    formData.title,
    formData.image,
    "#card-template",
    handleCardClick
  );
  const formCardInstance = formCardHandler.generateCard();
  cardList.addItem(formCardInstance);
});

editPopup.setEventListeners();
addPopup.setEventListeners();

// Create instance of PopupWithImage
const imagePopup = new PopupWithImage("#popup_img");
imagePopup.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardHandler = new Card(
        cardItem.name,
        cardItem.link,
        "#card-template",
        handleCardClick
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
  const bioData = userInfo.getUserInfo();
  inputFields.name.value = bioData.name;
  inputFields.aboutMe.value = bioData.userJob;
  editPopup.open();
});

buttons.closeEdit.addEventListener("click", (event) => {
  event.preventDefault();
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

// Event listener for closing image popup
buttons.closeImage.addEventListener("click", () => {
  imagePopup.close();
});

// Configuration object for form validation
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button--submit",
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
