import React from 'react';
import { api } from '../utils/Api';
import Card from './Card'
function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((res) => {
        setUserName(res[0].name);
        setUserDescription(res[0].about);
        setUserAvatar(res[0].avatar);
        setCards(res[1]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [])


  return (
    <>
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__avatar-container" style={{ backgroundImage: `url(${userAvatar})` }} >
        </div>
        <div className="profile__info">
          <h1 className="profile__info-name">{userName}</h1>
          <p className="profile__info-about">{userDescription}</p>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="редактировать информацию в профиле"
            onClick={onEditProfile}
          />
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="добавить новое место"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        {cards.map((card) => <Card onCardClick={onCardClick} card={card} key={card._id} />)}
      </section>
    </>
  );
}

export default Main;