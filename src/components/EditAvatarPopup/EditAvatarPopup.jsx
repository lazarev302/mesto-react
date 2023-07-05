import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isSend,
}) {
  const input = useRef();
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isSend={isSend}
      isValid={isValid}
    >
      <fieldset className="form__date">
        <input
          className={`form__input form__input_value_url-image ${
            isInputValid.avatar === undefined || isInputValid.avatar
              ? ""
              : "form__input_error"
          }`}
          ref={input}
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          value={values.avatar ? values.avatar : ""}
          onChange={handleChange}
        />
        <span
          className="form__error form__error_type_avatar"
          id="url-img-error"
        >
          {errors.avatar}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
