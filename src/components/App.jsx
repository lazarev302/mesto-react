import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import PopupImage from "./PopupImage/PopupImage.jsx";
import { useState } from "react";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setImagePopup] = useState(false)

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setImagePopup(false)
  }
  

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
    setImagePopup(true)
  }

  return (
<div className="page__content">

  <Header/>

  <Main
   onEditProfile = {handleEditProfileClick}
   onAddPlace = {handleAddPlaceClick}
   onEditAvatar = {handleEditAvatarClick}
   onCardClick = {handleCardClick}
  />

  <Footer/>

  <PopupWithForm 
  name="profile" 
  title="Редактировать профиль"
  isOpen = {isEditProfilePopupOpen}
  onClose={closeAllPopups}
  >
  <fieldset className="form__date">
    <input
      className="form__input form__input form__input_value_name"
      type="text"
      name="username"
      id="username"
      placeholder="Имя"
      minLength={2}
      maxLength={40}
      required=""
    />
    <span
      className="form__error form__error_type_username"
      id="name-profile-error"
    />
    <input
      className="form__input form__input_value_job"
      type="text"
      name="job"
      id="job"
      placeholder="Вид деятельности"
      minLength={2}
      maxLength={40}
      required=""
    />
    <span
      className="form__error form__error_type_job"
      id="job-profile-error"
    />
  </fieldset>
</PopupWithForm>

  <PopupWithForm 
  name="place" 
  title="Новое место"
  titleButton="Создать"
  isOpen={isAddPlacePopupOpen}
  onClose={closeAllPopups}
  >
  <fieldset className="form__date">
    <input
      className="form__input form__input_value_title"
      type="text"
      name="title"
      id="title"
      placeholder="Название"
      minLength={2}
      maxLength={30}
      required=""
      />
    <span
     className="form__error form__error_type_title"
      id="name-place-error"
    />
    <input
      className="form__input form__input_value_url-image"
      type="url"
      name="link"
      id="link"
      placeholder="Ссылка на картинку"
      />
    <span
      className="form__error form__error_type_link"
      id="url-image-error"
    />
    </fieldset>
  </PopupWithForm>

  <PopupWithForm 
    name="avatar" 
    title="Обновить аватар"
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}
  >
    <fieldset className="form__date">
      <input
        className="form__input form__input_value_url-image"
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
      />
      <span
        className="form__error form__error_type_avatar"
        id="url-img-error"
      />
    </fieldset>
  </PopupWithForm>

  <PopupWithForm 
    name="delete" 
    title="Вы уверенны?"
    titleButton="Да"
  />

  <PopupImage 
    card={selectedCard} 
    isOpen={isImagePopup}
    onClose={closeAllPopups}
  />

</div>

  );
}

export default App;
