export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__contanier">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <form noValidate="" className="form" name="formProfile">
          <h2 className="form__heading">{title}</h2>
          {children}
          <button type="submit" className="form__button form__button_valid">
            {titleButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
