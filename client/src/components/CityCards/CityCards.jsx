import "./CityCards.css";

import AtlantaImage from "../../assets/cities_images/atlanta.jpg";

function CityCard({ city, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(city);
  };

  return (
    <li className="citiesCard" onClick={handleCardClick}>
      <div className="citiesCard__board">
        <img className="citiesCard__image" src={city.image} alt={city.city} />
        <p className="citiesCard__name">{city.city}, {city.state}</p>
      </div>
    </li>
  );
}

export default CityCard;

// <div className="cities__cards">
//   <ul className="citiesCard__list">
//     <li className="citiesCard" onClick={handleCardClick}>
//       <div className="citiesCard__board">
//         <img
//           className="citiesCard__image"
//           src={AtlantaImage}
//           alt="Atlanta"
//         />
//         <p className="citiesCard__name">Atlanta, GA</p>
//       </div>
//     </li>
//   </ul>
// </div>
