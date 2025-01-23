function toggleModal(modal, isOpen) {
  modal.classList.toggle("popup--show", isOpen);
}

function toggleButtonState(button, fields) {
  const isDisabled = fields.some((field) => field.value === "");
  button.disabled = isDisabled;
}

// Function to handle server requests
function handleServerRequest({ request, handler }) {
  return request
    .then((res) => {
      return handler(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { toggleModal, toggleButtonState, handleServerRequest };

