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

function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => setCurrentUser(data))
      .catch((err) => {
        console.error(err);
      });
  }, [])

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
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, ...card });
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.error(err))
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => console.error(err))
  }




  React.useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [])

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
    api.deleteCard(card._id)
      .then(setCards(cards.filter(item => item !== card)))
      .catch((err) => {
        console.error(err);
      })
  }
  function handleAddPlaceSubmit(data) {
    let result = null;
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        return result = true;
      })
      .catch((err) => {
        console.error(err);
        return result = false;
      })
    return result;
  }


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

      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

    </CurrentUserContext.Provider>
  );
}

export default App;
