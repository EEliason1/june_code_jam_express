const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());
app.use(express.json());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
