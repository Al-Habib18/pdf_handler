/** @format */

const mongoose = require("mongoose");

let connectionURL = process.env.DB_CONNECTION_URL;
connectionURL = connectionURL.replace("<username>", process.env.DB_USERNAME);
connectionURL = connectionURL.replace("<password>", process.env.DB_PASSWORD);

const connectDB = async () => {
    console.log("Database connecting...");
    await mongoose.connect(/* connectionURL */ process.env.DB_URL, {
        dbName: process.env.DB_NAME,
    });
    console.log("Database connected");
};

module.exports = connectDB;
