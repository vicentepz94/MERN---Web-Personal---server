const express = require("express");
const { API_VERSION } = require("./constants");
const bodyParser = require("body-parser");

const app = express();

// Import routing
// ...

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder (se pueden agregar las carpetas que se necesiten usando el mismo codigo)
app.use(express.static("uploads"));

// Configure Header HTTP - CORS
// ...

//Configure routings
// ...

module.exports = app;
