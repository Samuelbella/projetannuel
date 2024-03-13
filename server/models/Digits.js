const mongoose = require("mongoose");

const DigitsSchema = new mongoose.Schema(
    {
        pixels: {
            type: [Number],
            required: true
        },
        label: {
            type: Number
        }
    },
    { collection: "collect" }
);

const Digit = mongoose.model("Digit", DigitsSchema);
module.exports = Digit;
