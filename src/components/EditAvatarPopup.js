import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({avatar: inputRef.current.value})
  }

  return (
    <PopupWithForm name='editAvatar' title='Обновить аватар' buttonText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
      <input
        ref={inputRef}
        type="url"
        name="link"
        required
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_field_image-url"
        id="link-input"
      />
      <span className="popup__input-error popup__input-error_type_url link-input-error" />
    </PopupWithForm >
  )
}

export default EditAvatarPopup;