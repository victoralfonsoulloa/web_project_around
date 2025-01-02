function toggleModal(modal, isOpen) {
  modal.classList.toggle("popup--show", isOpen);
}

function toggleButtonState(button, fields) {
  const isDisabled = fields.some((field) => field.value === "");
  button.disabled = isDisabled;
}

export { toggleModal, toggleButtonState };
