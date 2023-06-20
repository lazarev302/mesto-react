export default function ImagePopup({ card, isOpen, onClose }) {
    return(
        <div className={`popup popup_image ${isOpen && "popup_opened"}`}>
        <div className="popup__contanier">
          <button className="popup__close-button" type="button" onClick={onClose }/>
          <img className="popup__enlarged-image" src={card.link} alt={`Изображение ${card.name}`} />
          <p className="popup__title">{card.name}</p>
        </div>
      </div>
    )
}