import "./AboutUs.css";
import { linkedInInfo } from "../../utils/constants.js";

function AboutUs({}) {
  return (
    <div className="about" id="about-us">
      <div className="about__circle"></div>
      <div className="about__circle about__circle_animation_blurred"></div>
      <div className="about__us">
        <h2 className="about__us_title">About Us</h2>
        <p className="about__description">
          We are a dedicated team committed to facilitating enjoyable and
          efficient travel experiences. Our ethos centers on the fusion of fun
          and effectiveness, recognizing the importance of both leisure and
          productivity. Understanding the challenges inherent in trip planning,
          we prioritize providing value within reasonable timeframes. With our
          assistance, navigating the complexities of travel becomes a seamless
          and enjoyable endeavor.
        </p>
      </div>
      <div className="about__team">
        <h2 className="about__team_title">The Team</h2>
        <div className="about__team_position">
          <div className="about__team_group">
            <h3 className="about__team_position_name">Data Science</h3>
            <div className="teammate">
              <ul className="teammate__list">
                <li className="teammate__board">
                  <img
                    className="teammate__photo"
                    src={linkedInInfo[0].image}
                    alt={linkedInInfo[0].name}
                  />
                  <a href={linkedInInfo[0].link} className="teammate__name">
                    {linkedInInfo[0].name}
                  </a>
                </li>
                <li className="teammate__board">
                  <img
                    className="teammate__photo"
                    src={linkedInInfo[1].image}
                    alt={linkedInInfo[1].name}
                  />
                  <a href={linkedInInfo[1].link} className="teammate__name">
                    {linkedInInfo[1].name}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="about__team_group">
            <h3 className="about__team_position_name">SoftWare Engineer</h3>
            <div className="teammate">
              <ul className="teammate__list">
                <li className="teammate__board">
                  <img
                    className="teammate__photo"
                    src={linkedInInfo[2].image}
                    alt={linkedInInfo[2].name}
                  />
                  <a href={linkedInInfo[2].link} className="teammate__name">
                    {linkedInInfo[2].name}
                  </a>
                </li>
                <li className="teammate__board">
                  <img
                    className="teammate__photo"
                    src={linkedInInfo[3].image}
                    alt={linkedInInfo[3].name}
                  />
                  <a href={linkedInInfo[3].link} className="teammate__name">
                    {linkedInInfo[3].name}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
