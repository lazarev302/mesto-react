export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSend,
  isValid = true,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div
        className="popup__contanier"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <form
          noValidate
          className="form"
          name="formProfile"
          onSubmit={onSubmit}
        >
          <h2 className="form__heading">{title}</h2>
          {children}
          <button
            type="submit"
            className={`form__button form__button_valid ${
              isValid ? "" : "form__button_invalid"
            }`}
          >
            {isSend ? "..." : titleButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
