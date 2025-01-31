import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {handleServerRequest } from "../utils/utils.js";
import { buttons, inputFields } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// Function for Opening popup image
function handleCardClick(imageUrl, title) {
  imagePopup.open(imageUrl, title);
}

// Create UserInfo instance
const userInfo = new UserInfo(
  ".profile__bio-name",
  ".profile__bio-description",
  ".profile__image-user"
);

// Get user info from the server and set it in the profile
handleServerRequest({
  request: api.getUserInfo(),
  handler: (userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    // userInfo.setUserId(userData._id);
    // userInfo.setUserAvatar(userData.avatar);
  },
});

// Create instance of PopupWithForm for editing user info
const editPopup = new PopupWithForm("#popup--edit", (formData) => {
  handleServerRequest({
    request: api.editUserInfo(
      inputFields.name.value,
      inputFields.aboutMe.value
    ),
    handler: (formData) => {
      userInfo.setUserInfo(formData.name, formData.about);
    },
  });
});

// Create instance of PopupWithForm for editing user avatar
const avatarPopup = new PopupWithForm("#popup-change_avatar", (formData) => {
  handleServerRequest({
    request: api.changeProfilePicture(inputFields.avatar.value),
    handler: (formData) => {
      userInfo.setUserAvatar(formData.avatar);
    },
  });
});

// Create instance of PopupWithForm for adding a new card
const addPopup = new PopupWithForm("#popup-add", (formData) => {
  handleServerRequest({
    request: api.addNewCard(formData.title, formData.image),
    handler: (newCardData) => {
      // Create a new card instance
      const cardHandler = new Card(
        newCardData.name, // Assuming the server responds with `name`
        newCardData.link, // Assuming the server responds with `link`
        "#card-template",
        handleCardClick,
        () => {
          deleteCardPopup.open(newCardData._id, () => {cardHandler.removeCard()});
        }
      );
      const cardInstance = cardHandler.generateCard();

      // Add the new card to the section
      const cardSection = new Section(
        {
          items: [cardInstance], // Add the new card directly
          renderer: (cardItem) => {
            cardSection.addItem(cardItem); // Use addItem to render it
          },
        },
        ".cards"
      );

      cardSection.renderItems(); // Render the new card
    },
  });
});

//Create instance of PopupWithConfirmation for deleting a card
const deleteCardPopup = new PopupWithConfirmation("#popup_delete_card", (formData, handlerOnDelete) => {
  handleServerRequest({
    request: api.deleteCard(formData),
    handler: (formData) => {
      handlerOnDelete();
    },
  });
});

editPopup.setEventListeners();
addPopup.setEventListeners();
avatarPopup.setEventListeners();
deleteCardPopup.setEventListeners();

// Create instance of PopupWithImage
const imagePopup = new PopupWithImage("#popup_img");
imagePopup.setEventListeners();

// Add initial cards to the page
handleServerRequest({
  request: api.getInitialCards(),
  handler: (initialCards) => {
    // console.log(initialCards);
    const cardList = new Section(
      {
        items: initialCards,
        renderer: (cardItem) => {
          const cardHandler = new Card(
            cardItem.name,
            cardItem.link,
            "#card-template",
            handleCardClick,
            () => {
              deleteCardPopup.open(cardItem._id, () => {
                cardHandler.removeCard();
              });
            }
          );
          const cardInstance = cardHandler.generateCard();
          cardList.addItem(cardInstance);
        },
      },
      ".cards"
    );
    cardList.renderItems();
  },
});

// Event listeners for opening and closing edit popup
buttons.openEdit.addEventListener("click", () => {
  const bioData = userInfo.getUserInfo();
  inputFields.name.value = bioData.name;
  inputFields.aboutMe.value = bioData.userJob;
  editPopup.open();
});

// Event listener for opening and closing add popup
buttons.openAdd.addEventListener("click", () => {
  inputFields.title.value = "";
  inputFields.image.value = "";
  addPopup.open();
});


// Event listener for opening and closing avatar popup
buttons.openAvatar.addEventListener("click", () => {
  inputFields.avatar.value = "";
  avatarPopup.open();
});

// Configuration object for form validation
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: "#form__button",
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
