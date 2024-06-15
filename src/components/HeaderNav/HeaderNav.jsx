import "./HeaderNav.css";
import logo from "../../assets/logo.jpg";

function HeaderNav({}) {
  return (
    <div className="nav">
      <img src={logo} alt="LOGO" className="nav__logo" />
      <ul className="nav__links">
        <li>
          <a className="nav__link" href="#maps">
            Maps
          </a>
        </li>
        <li>
          <a className="nav__link" href="#cities">
            Cities
          </a>
        </li>
        <li>
          <a className="nav__link" href="#about-us">
            About Us
          </a>
        </li>
      </ul>
    </div>
  );
}

export default HeaderNav;
