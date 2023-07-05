export default function LikeButton({ myid, card, onCardLike }) {
  const isLike = card.likes.some((element) => myid === element._id);

  return (
    <div className="card__like-group">
      <button
        type="button"
        className={`card__like-button ${
          isLike ? `card__like-button_active` : ""
        }`}
        onClick={() => onCardLike(card)}
      />
      <span className="card__like-counter">{card.likes.length}</span>
    </div>
  );
}
