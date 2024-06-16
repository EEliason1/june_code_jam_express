import "./Header.css";
import HeaderPhoto from "../../assets/headerphoto.jpg";

import HeaderNav from "../HeaderNav/HeaderNav.jsx";
import StartingCityForm from "../StartingCityForm/StartingCityForm.jsx";

function Header({handleFormSubmit}) {
  return (
    <div className="header">
      <HeaderNav />
      <img src={HeaderPhoto} alt="Road Map" className="header__image" />
      <StartingCityForm handleFormSubmit={handleFormSubmit} />
    </div>
  );
}

export default Header;
