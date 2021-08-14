import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const inputNameRef = React.useRef(null);
  const inputLinkRef = React.useRef(null);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(({ name: inputNameRef.current.value, link: inputLinkRef.current.value }))
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} name='add-place' title='Новое место' buttonText='Создать' isOpen={isOpen} onClose={onClose} >
      <input
        ref={inputNameRef}
        type="text"
        id="title-input"
        name="name"
        className="popup__input popup__input_field_place-name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required
      />
      <span className="popup__input-error popup__input-error_type_title title-input-error" />
      <input
        ref={inputLinkRef}
        type="url"
        id="url-input"
        name="link"
        className="popup__input popup__input_field_image-url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__input-error popup__input-error_type_url url-input-error" />
    </PopupWithForm >
  )
}

export default AddPlacePopup;