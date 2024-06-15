const express = require("express");

const app = express();
const { PORT = 3001 } = process.env;

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree", "userFour"] });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
