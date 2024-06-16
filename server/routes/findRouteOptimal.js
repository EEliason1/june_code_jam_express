const router = require("express").Router();
const optimalRoute = require("../controllers/optimalRoute.js");

router.post("/", optimalRoute);

module.exports = router;
