import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ isOpen: false});
  }

  function handleCardClick(card) {
    setSelectedCard({isOpen: true, ...card});
  }


  return (
    <>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm name='edit-profile' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} >
        <input
          type="text"
          id="name-input"
          name="name"
          className="popup__input popup__input_field_name"
          placeholder="Отображаемое имя"
          minLength={2}
          maxLength={40}
          required
        />
        <span className="popup__input-error popup__input-error_type_name name-input-error" />
        <input
          type="text"
          id="about-input"
          name="about"
          className="popup__input popup__input_field_about"
          placeholder="деятельность"
          minLength={2}
          maxLength={200}
          required
        />
        <span className="popup__input-error popup__input-error_type_about about-input-error" />
      </PopupWithForm >

      <PopupWithForm name='add-place' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} >
        <input
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
          type="url"
          id="url-input"
          name="link"
          className="popup__input popup__input_field_image-url"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error popup__input-error_type_url url-input-error" />
      </PopupWithForm >

      <PopupWithForm name='editAvatar' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} >
        <input
          type="url"
          name="link"
          required
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_field_image-url"
          id="link-input"
        />
        <span className="popup__input-error popup__input-error_type_url link-input-error" />
      </PopupWithForm >

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </>
  );
}

export default App;
