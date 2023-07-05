import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import LikeButton from "../LikeButton/LikeButton.jsx";

export default function Card({ card, onCardClick, onDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <article className="card">
      {currentUser._id === card.owner._id && (
        <button
          className="card__delete-button"
          type="button"
          onClick={() => onDelete(card._id)}
        />
      )}
      <img
        className="card__image"
        src={card.link}
        alt={`Изображение ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="card__text">
        <h2 className="card__title">{card.name}</h2>
        <LikeButton
          onCardLike={onCardLike}
          myid={currentUser._id}
          card={card}
        />
      </div>
    </article>
  );
}
