import "./Main.css";

import GoodRoute from "../GoodRoute/GoodRoute.jsx";
import RandomRoute from "../RandomRoute/RandomRoute.jsx";
import CityPass from "../CityPass/CityPass.jsx";
import AboutUs from "../AboutUs/AboutUs.jsx";

function Main({ handleCardClick, selectedRoute }) {
  return (
    <div className="main">
      <RandomRoute />
      <GoodRoute selectedRoute={selectedRoute}/>
      <CityPass handleCardClick={handleCardClick} />
      <AboutUs />
    </div>
  );
}

export default Main;
