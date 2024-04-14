const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./api/routes/user");
const historicalSiteRoute = require("./api/routes/historicalSite");
const commentRoute = require("./api/routes/comment");

dotenv.config();

const PORT = process.env.PORT;
const router = require("./api/routes/index");
const db = require('./api/config/db');

//Connect to db
db.connect();


app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));

//ROUTES
app.use("/api", router);

app.use("/", (req, res) => {
    res.status(200).json("Hello!");
})

// const db = require('../src/api/models')
// app.use("/v1/historicalSite", historicalSiteRoute);
// app.use("/v1/user", userRoute);
// app.use("/v1/comment", commentRoute);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});