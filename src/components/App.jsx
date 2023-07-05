import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopup, setImagePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSend, setIsSend] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  const [card, setCard] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState("");

  const setAllStatesForClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeletePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopup(false);
  }, []);

  const closePopupByEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setAllStatesForClosePopups();
        document.removeEventListener("keydown", closePopupByEsc);
      }
    },
    [setAllStatesForClosePopups]
  );

  const closeAllPopups = useCallback(() => {
    setAllStatesForClosePopups();
    document.removeEventListener("keydown", closePopupByEsc);
  }, [setAllStatesForClosePopups, closePopupByEsc]);

  function setEventListenerForDocument() {
    document.addEventListener("keydown", closePopupByEsc);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId);
    setDeletePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListenerForDocument();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
    setEventListenerForDocument();
  }

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()]).then(
      ([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCard(dataCards);
      }
    );
  }, []);

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    setIsSend(true);
    api.deleteCard(deleteCardId).then(() => {
      setCard(
        card.filter((item) => {
          return item._id !== deleteCardId;
        })
      );
      closeAllPopups();
      setIsSend(false);
    });
  }

  const handleLike = useCallback(
    (card) => {
      const isLike = card.likes.some(
        (element) => currentUser._id === element._id
      );
      if (isLike) {
        api
          .deleteLike(card._id)
          .then((res) => {
            setCard((state) =>
              state.map((c) => (c._id === card._id ? res : c))
            );
          })
          .catch((err) => console.error(`Ошибка при снятии лайка ${err} `));
      } else {
        api
          .addLike(card._id)
          .then((res) => {
            setCard((state) =>
              state.map((c) => (c._id === card._id ? res : c))
            );
          })
          .catch((err) => console.error(`Ошибка при установке лайка ${err} `));
      }
    },
    [currentUser._id]
  );

  function handleUpdateUser(dataUser, reset) {
    setIsSend(true);
    api.setUserInfo(dataUser).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
      reset();
      setIsSend(false);
    });
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSend(true);
    api.setNewAvatar(dataUser).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
      reset();
      setIsSend(false);
    });
  }

  function handleAddPlaceSubmit(dataCards, reset) {
    setIsSend(true);
    api.addCard(dataCards).then((res) => {
      setCard([res, ...card]);
      closeAllPopups();
      reset();
      setIsSend(false);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDelete={handleDeletePopupClick}
          onCardLike={handleLike}
          card={card}
        />

        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверенны?"
          titleButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteSubmit}
          isSend={isSend}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
