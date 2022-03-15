const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;
const db = process.env.DATABASE;
// Accessing the path module
const path = require("path");

// * config
app.use(cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * connect to mongodb
mongoose.connect(
  db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    console.log(err);
    app.listen(port, () => {
      console.log(`server is running on port-${port}`);
    });
  }
);

// * routes for the attendance

app.use("/", routes);

app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
