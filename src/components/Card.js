function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="element" >
      <button type="button" className="element__delete-button" aria-label="кнопка 'удалить'"></button>
      <img className="element__image" src={props.card.link} alt="картинка" onClick={handleClick} />
      <div className="element__panel">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__likes">
          <button type="button" className="element__heart-button"
            aria-label="отметить место как понравившееся"></button>
          <p className="element__amount-likes">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;