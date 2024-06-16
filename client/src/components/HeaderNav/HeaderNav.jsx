import "./HeaderNav.css";
import logo from "../../assets/logo.jpg";
import { HashLink as Link } from "react-router-hash-link";

function HeaderNav({}) {
  return (
    <div className="nav">
      <img src={logo} alt="LOGO" className="nav__logo" />
      <ul className="nav__links">
        <li>
          <Link className="nav__link" to="#maps">
            <p className="nav__text">Maps</p>
          </Link>
        </li>
        <li>
          <Link className="nav__link" to="#cities">
            <p className="nav__text">Cities</p>
          </Link>
        </li>
        <li>
          <Link className="nav__link" to="#about-us">
            <p className="nav__text">About Us</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HeaderNav;
