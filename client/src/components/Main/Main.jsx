import "./Main.css";

import GoodRoute from "../GoodRoute/GoodRoute.jsx";
import RandomRoute from "../RandomRoute/RandomRoute.jsx";
import CityPass from "../CityPass/CityPass.jsx";

function Main({}) {
  return (
    <div className="main">
      <RandomRoute />
      <GoodRoute />
      <CityPass />
    </div>
  );
}

export default Main;
