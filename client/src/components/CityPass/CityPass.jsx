import "./CityPass.css";

import CityCards from "../CityCards/CityCards.jsx";

function CityPass({}) {
  return (
    <div className="cities">
      <h2 className="cities__title">City Pass</h2>
      <div className="cities__decoration-line"></div>
      <p className="cities__subtitle">Fast, Fun, Afforable</p>
      <CityCards />
    </div>
  );
}

export default CityPass;
