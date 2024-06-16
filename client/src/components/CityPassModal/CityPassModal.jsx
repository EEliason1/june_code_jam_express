import "./CityPassModal.css";

function CityPassModal({ handleCloseClick, activeModal, selectedCard }) {
  const funThings = selectedCard.funThings || [];

  return (
    <div className={`modal ${activeModal === "preview" && "modal__opened"}`}>
      <div className="modal__content">
        <button
          className="modal__close-button"
          type="button"
          onClick={handleCloseClick}
        ></button>
        <div className="modal__sections">
          <div className="modal__card-info">
            <h2 className="modal__title">City Pass</h2>
            <div className="modal__decoration-line"></div>
            <p className="modal__subtitle">Fast, Fun, Afforable</p>
            <h2 className="modal__city-name">{selectedCard.city}</h2>
            <div className="modal__things-to-do">
              <h2 className="modal__list-title">Fun Things To Do:</h2>
              <ul className="modal__list">
                <li className="modal__list-item">
                <p className="modal__list-text">1:&nbsp;</p>
                <p className="modal__list-text">{funThings[1]}</p>
                </li>
                <li className="modal__list-item">
                <p className="modal__list-text">2:&nbsp;</p>
                <p className="modal__list-text">{funThings[2]}</p>
                </li>
                <li className="modal__list-item">
                <p className="modal__list-text">3:&nbsp;</p>
                <p className="modal__list-text">{funThings[3]}</p>
                </li>
                <li className="modal__list-item">
                <p className="modal__list-text">4:&nbsp;</p>
                <p className="modal__list-text">{funThings[4]}</p>
                </li>
                <li className="modal__list-item">
                <p className="modal__list-text">5:&nbsp;</p>
                <p className="modal__list-text">{funThings[5]}</p>
                </li>
                <li className="modal__list-item">
                  <p className="modal__list-text">6:&nbsp;</p>
                  <p className="modal__list-text">{funThings[6]}</p>
                </li>
              </ul>
            </div>
            <button
              className="modal__submit-button"
              type="button"
              href={selectedCard.cityLink}
            //   onClick={handleCloseClick}
            >
              City Pass
            </button>
          </div>
          <img
            src={selectedCard.image}
            alt={selectedCard.name}
            className="modal__card-image"
          />
        </div>
      </div>
    </div>
  );
}

export default CityPassModal;
