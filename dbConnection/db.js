const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
function  dbConnection(){
    mongoose.connect(process.env.MONGODB_URI).then(() => {console.log("Connected to Db ✅")}).catch((error) => {console.log(error)});
}

module.exports = dbConnection;