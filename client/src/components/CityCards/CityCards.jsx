import "./CityCards.css";

import AtlantaImage from "../../assets/cities_images/atlanta.jpg";

function CityCards({}) {
  return (
    <div className="cities__cards">
      <ul className="citiesCard__list">
        <li className="citiesCard">
          <div className="citiesCard__board">
            <img
              className="citiesCard__image"
              src={AtlantaImage}
              alt="Atlanta"
            />
            <p className="citiesCard__name">Atlanta, GA</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CityCards;
