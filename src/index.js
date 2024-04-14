const express = require("express");
const cors = require("cors");
const app = express();
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const historicalSiteRoute = require("./routes/historicalSite");
const commentRoute = require("./routes/comment");

dotenv.config();

// Khởi tạo kết nối Mongoose
mongoose.connect((process.env.MONGODB_URL))
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });


app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));

//ROUTES
app.use("/v1/historicalSite", historicalSiteRoute);
app.use("/v1/user", userRoute);
app.use("/v1/comment", commentRoute);

app.listen(8000, () => {
    console.log("Server is running...");
});