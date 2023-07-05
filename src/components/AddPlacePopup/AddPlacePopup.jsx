import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSend }) {
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ title: values.title, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isSend={isSend}
    >
      <fieldset className="form__date">
        <input
          className={`form__input form__input_value_title ${
            isInputValid.title === undefined || isInputValid.title
              ? ""
              : "form__input_error"
          }`}
          type="text"
          name="title"
          id="title"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
          value={values.title ? values.title : ""}
          onChange={handleChange}
        />
        <span
          className="form__error form__error_type_title"
          id="name-place-error"
        >
          {errors.title}
        </span>
        <input
          className={`form__input form__input_value_url-image ${
            isInputValid.link === undefined || isInputValid.link
              ? ""
              : "form__input_error"
          }`}
          type="url"
          name="link"
          id="link"
          placeholder="Ссылка на картинку"
          required
          value={values.link ? values.link : ""}
          onChange={handleChange}
        />
        <span
          className="form__error form__error_type_link"
          id="url-image-error"
        >
          {errors.link}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
