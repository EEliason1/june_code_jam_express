const router = require("express").Router();
const { optimalPython } = require("../controllers/optimalRoute.js");

router.post("/", optimalPython);

module.exports = router;
