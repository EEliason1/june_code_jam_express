import "./CityPass.css";
import { cityList } from "../../utils/constants.js";

import CityCard from "../CityCards/CityCards.jsx";

function CityPass({ handleCardClick }) {
  return (
    <div className="cities">
      <h2 className="cities__title">City Pass</h2>
      <div className="cities__decoration-line"></div>
      <p className="cities__subtitle">Fast, Fun, Afforable</p>
      <div className="cities__cards">
        <ul className="citiesCard__list">
          {cityList.map((city) => {
            return (
              <CityCard
                key={city._id}
                city={city}
                onCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CityPass;
