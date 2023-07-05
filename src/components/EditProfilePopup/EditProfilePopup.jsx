import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isSend,
}) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    errors,
    isInputValid,
    isValid,
    handleChange,
    reset,
    setValue,
  } = useFormValidation();

  useEffect(() => {
    setValue("username", currentUser.name);
    setValue("job", currentUser.about);
  }, [currentUser, setValue]);

  function resetForClose() {
    onClose();
    reset({ username: currentUser.name, job: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ username: values.username, job: values.job }, reset);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      isSend={isSend}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__date">
        <input
          className={`form__input form__input form__input_value_name ${
            isInputValid.username === undefined || isInputValid.username
              ? ""
              : "form__input_error"
          }`}
          type="text"
          name="username"
          id="username"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required
          value={values.username ? values.username : ""}
          onChange={handleChange}
        />
        <span
          className="form__error form__error_type_username"
          id="name-profile-error"
        >
          {errors.username}
        </span>
        <input
          className={`form__input form__input_job ${
            isInputValid.job === undefined || isInputValid.job
              ? ""
              : "form__input_error"
          }`}
          type="text"
          name="job"
          id="job"
          placeholder="Вид деятельности"
          minLength={2}
          maxLength={40}
          required
          value={values.job ? values.job : ""}
          onChange={handleChange}
        />
        <span
          className="form__error form__error_type_job"
          id="job-profile-error"
        >
          {errors.job}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}
