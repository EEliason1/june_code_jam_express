import "./RandomRoute.css";

import badRouteImage from "../../assets/random_route.png";

function RandomRoute({}) {
  return (
    <div className="badRoute" id="maps">
      <img className="badRoute__image" src={badRouteImage} alt="random_route" />
      <div className="badRoute__text">
        <h2 className="badRoute__title">Traveling without planning?</h2>
        <ul className="badRoute__lists">
          <li className="badRoute__list">Waste of gas and time.</li>
          <li className="badRoute__list">
            Spending more time on driving than having fun.
          </li>
          <li className="badRoute__list">
            Are you sure you can come back in time?
          </li>
        </ul>
        <h2 className="badRoute__estimateTime">
          Estimated distance for random route is
          <span className="badRoute__estimateTimeNumber"> 99999.99</span> miles.
        </h2>
      </div>
    </div>
  );
}

export default RandomRoute;
