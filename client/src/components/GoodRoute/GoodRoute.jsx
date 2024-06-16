import "./GoodRoute.css";
import React from "react";

import { possibleRoutes } from "../../utils/constants.js";

function GoodRoute({ selectedRoute }) {
  const city = selectedRoute.startingCity;
  const circular = selectedRoute.circularPath;

  const filteredRoutes = possibleRoutes.find((route) => {
    if (!city || !circular) {
      return route.startingCity === "Random" && route.circularPath === "no";
    }
    return route.startingCity === city && route.circularPath === circular;
  });

  const chosenRoute = filteredRoutes?.image;

  return (
    <div className="goodRoute">
      <div className="goodRoute__content">
        <div className="goodRoute__board">
          <h2 className="goodRoute__title">Best Route</h2>
          <div className="goodRoute__cities-board">
            <h3 className="goodRoute__cities-board_text">
              Follow by the cities:
            </h3>
            <ul className="goodRoute__cities-board_cities">
              <li className="goodRoute__cities-board_city">Dallas</li>
              <li className="goodRoute__cities-board_city">Los Angeles</li>
              <li className="goodRoute__cities-board_city">Seattle</li>
              <li className="goodRoute__cities-board_city">Denver</li>
              <li className="goodRoute__cities-board_city">Chicago</li>
              <li className="goodRoute__cities-board_city">New York</li>
              <li className="goodRoute__cities-board_city">Atlanta</li>
              <li className="goodRoute__cities-board_city">Tampa</li>
            </ul>
          </div>
          <div className="goodRoute__estimate-board">
            <h3 className="goodRoute__estimate-board_text">
              Estimated&nbsp;Distance:
              <br />
              <span className="goodRoute__estimate-board_textNumber">
                Below Map&nbsp;
              </span>
              {/* miles */}
            </h3>
          </div>
        </div>
        <img src={chosenRoute} alt="best_route" className="goodRoute__image" />
      </div>
    </div>
  );
}

export default GoodRoute;
