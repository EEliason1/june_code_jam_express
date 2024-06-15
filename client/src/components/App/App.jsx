import React, { useEffect, useState } from "react";
import "./App.css";

import Header from "../Header/Header.jsx";

function App() {
  const [pythonEfficientMap, setPythonEfficientMap] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setPythonEfficientMap(data));
  }, []);

  return (
    <div className="App">
      <div className="App__content">
        <Header />
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