// Requiring in everything for server to run
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();

// Allowing express to use these
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(routes);

// Server start
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  })
});