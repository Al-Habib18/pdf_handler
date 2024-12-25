/** @format */

const { Schema, model } = require("mongoose");

const subjectSchema = new Schema(
    {
        name: {
            type: String,
        },
        code: {
            type: String,
            maxlength: 10,
            minlength: 3,
            require: true,
        },
        theoryFailed: {
            type: Array,
        },
        practicalFailed: {
            type: Array,
        },
    },
    { timestamps: true }
);

const Subject = model("Subject", subjectSchema);

module.exports = Subject;
