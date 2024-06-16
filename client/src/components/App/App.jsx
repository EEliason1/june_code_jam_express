import React, { useEffect, useState } from "react";
import "./App.css";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import CityPassModal from "../CityPassModal/CityPassModal.jsx";
import Footer from "../Footer/Footer.jsx";

function App() {
  const [pythonEfficientMap, setPythonEfficientMap] = useState([{}]);
  const [pythongRandomMap, setPythonRandomMap] = useState([{}]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedRoute, setSelectedRoute] = useState({
    startingCity: "",
    circularPath: "",
  });

  const addModalEventListeners = () => {
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("click", handleClickOutside);
  };

  const removeModalEventListeners = () => {
    document.removeEventListener("keydown", handleEscClose);
    document.removeEventListener("keydown", handleClickOutside);
  };

  const openModal = (modal) => {
    setActiveModal(modal);
    addModalEventListeners();
  };

  const handleCardClick = (card) => {
    openModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
    removeModalEventListeners();
  };

  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      closeActiveModal();
    }
  };

  const handleClickOutside = (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeActiveModal();
    }
  };

  const handleFormSubmit = (cityInfo, handleStateReset) => {
    setSelectedRoute({
      startingCity: cityInfo.startingCity,
      circularPath: cityInfo.circularPath,
    });
    handleStateReset();
  };

  useEffect(() => {
    fetch("/findRoute")
      .then((res) => res.json())
      .then((data) => setPythonEfficientMap(data));
  }, []);

  return (
    <div className="App">
      <div className="App__content">
        <Header handleFormSubmit={handleFormSubmit} />
        <Main handleCardClick={handleCardClick} selectedRoute={selectedRoute} />
        <Footer />
        <CityPassModal
          activeModal={activeModal}
          selectedCard={selectedCard}
          handleCloseClick={closeActiveModal}
        />
      </div>
    </div>
  );
}

export default App;

//API Test Code
// {/* {(typeof pythonEfficientMap.users === 'undefined' ? (
//   <p>Loading...</p>
// ) : (
//   pythonEfficientMap.users.map((user, i) => (
//     <p key={i}>{user}</p>
//   ))
// ))} */}
