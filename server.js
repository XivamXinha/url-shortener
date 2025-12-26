const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const urlRoutes = require("./routes/urlRoutes");
app.use("/", urlRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
