import "./StartingCityForm.css";

function StartingCityForm({}) {
  return (
    <div className="submitBoard">
      <h1 className="submitBoard__title">Find a Road Trip with TDQ</h1>
      <h2 className="submitBoard__subtitle">
        Plan an efficient road trip across the country with Trips Done Quick
      </h2>
      <form action="" className="submitBoard__form">
        <fieldset className="form__fieldset">
          <label htmlFor="" className="form__label">
            STARTING CITY*
            <input
              type="text"
              className="form__input"
              placeholder="City, State"
            />
          </label>
          <button className="form__button">Search</button>
        </fieldset>
      </form>
    </div>
  );
}

export default StartingCityForm;
