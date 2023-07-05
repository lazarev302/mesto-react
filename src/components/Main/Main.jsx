import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDelete,
  onCardLike,
  card,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__data">
          <button
            className="profile__avatar-button"
            type="button"
            onClick={onEditAvatar}
          >
            <img
              src={currentUser.avatar ? currentUser.avatar : "#"}
              alt="Аватар"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">
              {currentUser.name ? currentUser.name : ""}
            </h1>
            <p className="profile__subtitle">
              {currentUser.about ? currentUser.about : ""}
            </p>
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
                <Card
                  card={data}
                  onCardClick={onCardClick}
                  onDelete={onDelete}
                  onCardLike={onCardLike}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
