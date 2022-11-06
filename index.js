// Para conectarse a mongoose
const mongoose = require("mongoose");

// Para levantar el servidor http
const app = require("./app");

// Para conectarse a mongoose
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  IP_SERVER,
  API_VERSION,
} = require("./constants");

// Para levantar el servidor http
const PORT = process.env.POST || 3977;

// Para conectarse a mongoose
mongoose.connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`,
  (error) => {
    if (error) throw error;

    app.listen(PORT, () => {
      console.log("######################");
      console.log("###### API REST ######");
      console.log("######################");
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    });
  }
);
