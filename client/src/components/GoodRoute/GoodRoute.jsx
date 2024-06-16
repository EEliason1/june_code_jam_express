import "./GoodRoute.css";

import GoodRouteImage from "../../assets/random_route.png";

function GoodRoute({}) {
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
                10000.00&nbsp;
              </span>
              miles
            </h3>
          </div>
        </div>
        <img
          src={GoodRouteImage}
          alt="best_route"
          className="goodRoute__image"
        />
      </div>
    </div>
  );
}

export default GoodRoute;
