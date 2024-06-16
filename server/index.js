const express = require("express");
const { spawn } = require("child_process");
const app = express();
const { PORT = 3001 } = process.env;

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree", "userFour"] });
});

// Optimal route api setup
app.get("/map", (req, res) => {
  let dataToSend;

  //Find optimal route info
  const pythonProcess = spawn("py", ["scripts/optimal_route_generator.py"]);

  //Convert optimal route info
  pythonProcess.stdout.on("data", function (data) {
    dataToSend = data.toString();
  });

  //Send optimal route info
  pythonProcess.on("exit", (code) => {
    console.log("Data sent successfully", code);
    res.send(dataToSend);
  });
});

app.get("/script1", (req, res) => {
  let data1;
  const pythonOne = spawn("py", ["script1.py"]);
  pythonOne.stdout.on("data", function (data) {
    data1 = data.toString();
  });
  pythonOne.on("exit", (code) => {
    console.log("code", code);
    res.send(data1);
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
