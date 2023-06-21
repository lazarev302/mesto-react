import { useEffect, useState } from "react";
import api from "../../utils/api";
import Card from "../Card/Card.jsx";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDiscription, setUserDiscription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [card, setCard] = useState([]);

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()]).then(
      ([dataUser, dataCards]) => {
        setUserName(dataUser.name);
        setUserDiscription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        dataCards.forEach((data) => (data.myid = dataUser._id));
        setCard(dataCards);
      }
    );
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__data">
          <button
            className="profile__avatar-button"
            type="button"
            onClick={onEditAvatar}
          >
            <img src={userAvatar} alt="Аватар" className="profile__avatar" />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <p className="profile__subtitle">{userDiscription}</p>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            />
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards-container">
        <ul className="cards">
          {card.map((data) => {
            return (
              <li className="card__list" key={data._id}>
                <Card card={data} onCardClick={onCardClick} />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
