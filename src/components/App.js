import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';



//Реализацией валидации и индикаторов отправки данных сейчас занимаюсь. Но пока отправляю минимальный для сдачи проект.
function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [request, setRequest] = React.useState(true);
  const [deleteCard, setDeleteCard] = React.useState({ isOpen: false });

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
    setSelectedCard({ isOpen: false });
    setDeleteCard({ isOpen: false });
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, ...card });
  }

  async function handleUpdateUser(data) {
    setRequest(false);
    api.editUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
      .finally(() => { setRequest(true) });
  }

  function handleUpdateAvatar(data) {
    setRequest(false);
    api.editAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => console.error(err))
      .finally(() => { setRequest(true) });
  }

  function handleAddPlaceSubmit(data) {
    setRequest(false);
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => { setRequest(true) });
  }

  function handleCardLike(card, isLiked) {
    (isLiked ? api.deleteLike(card._id) : api.addLike(card._id))
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.error(err);
      })
  }

  function handleCardDelete(card) {
    setDeleteCard({ isOpen: true, ...card });
  }

  function handleConfirmDelete(card) {
    setRequest(false);
    api.deleteCard(card._id)
      .then(() => setCards(cards.filter(item => item !== card)), (err) => console.error(err))
      .finally(() => { setRequest(true) });
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((res) => {
        setCurrentUser(res[0]);
        setCards(res[1]);
      })
      .catch((err) => {
        console.error(err);
      })
  }, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardDelete={handleCardDelete}
        onCardLike={handleCardLike}
        cards={cards}
      />

      <Footer />

      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} request={request} />

      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} request={request} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} request={request} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <ConfirmDeletePopup deleteCard={deleteCard} onClose={closeAllPopups} request={request} confirmDelete={handleConfirmDelete} />

    </CurrentUserContext.Provider>
  );
}

export default App;
