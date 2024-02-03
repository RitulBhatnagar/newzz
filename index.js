const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config()
const articleRoute = require("./routes/artilce-route");
app.use(cors());

app.use("/news", articleRoute);

module.exports.handler = serverless(app);
