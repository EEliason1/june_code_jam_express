const router = require("express").Router();
const { findOptimalRoute } = require("./findRouteOptimal");

router.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree", "userFour"] });
});

router.use("/findRoute", findOptimalRoute);

router.use((req, res) =>
  res.status(400).send({ message: "Page does not exist." })
);

module.exports = { router };
