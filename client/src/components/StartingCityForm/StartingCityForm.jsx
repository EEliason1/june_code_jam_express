import "./StartingCityForm.css";
import React, { useState } from "react";

function StartingCityForm({ handleFormSubmit }) {
  const [startingCity, setStartingCity] = useState("");
  const [circularPath, setCircularPath] = useState("");

  const handleStartingCityChange = (evt) => {
    setStartingCity(evt.target.value);
  };

  const handleCircularPathChange = (evt) => {
    setCircularPath(evt.target.value);
  };

  const handleStateReset = () => {
    setStartingCity("");
    setCircularPath("");
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    handleFormSubmit({ startingCity, circularPath }, handleStateReset);
  };

  return (
    <div className="submitBoard">
      <h1 className="submitBoard__title">Find a Road Trip with TDQ</h1>
      <h2 className="submitBoard__subtitle">
        Plan an efficient road trip across the country with Trips Done Quick
      </h2>
      <form action="" className="submitBoard__form" onSubmit={onFormSubmit}>
        <fieldset className="form__fieldset">
          <label htmlFor="starting-city" className="form__label">
            STARTING CITY*
            <input
              type="text"
              className="form__input"
              placeholder="Starting City"
              id="starting-city"
              name="starting-city"
              value={startingCity}
              onChange={handleStartingCityChange}
              required
            />
          </label>
          <fieldset className="form__radio-buttons">
            <legend className="form__legend">Return to starting city?</legend>
            <label htmlFor="yes" className="form__radio-button">
              <input
                type="radio"
                id="yes"
                name="circular"
                value="yes"
                required
                onChange={handleCircularPathChange}
              />
              Yes
            </label>
            <label htmlFor="no" className="form__radio-button">
              <input
                type="radio"
                id="no"
                name="circular"
                value="no"
                onChange={handleCircularPathChange}
              />
              No
            </label>
          </fieldset>
          <button className="form__button" type="submit">
            Search
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default StartingCityForm;
