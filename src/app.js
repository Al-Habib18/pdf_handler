/** @format */
const express = require("express");
const routes = require("./routes");
const morgan = require("morgan");

// express app
const app = express();

// applyMiddleware(app);
app.use(express.json());
app.use(morgan("dev"));
app.use(routes);

app.get("/health", (req, res) => {
    res.status(200).json({
        health: "OK",
        user: req.user,
    });
});

app.use((err, req, res, next) => {
    // format error
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

module.exports = app;
