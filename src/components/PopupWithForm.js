function PopupWithForm({ name, title, children, isOpen, onClose}) {


  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          aria-label="кнопка закрыть"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form name={name} className="popup__form" autoComplete="on" noValidate>
          {children}
          <button
            type="submit"
            className="popup__save-button"
            aria-label="кнопка отправки формы"
          >
            Подтвердить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;