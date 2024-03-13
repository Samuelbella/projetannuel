const mongoose = require("mongoose");

const DigitsSchema = new mongoose.Schema(
    {
        pixels: {
            type: [Number],         //Liste de 0 et de 1
        },
        label: {
            type: Number            //Nombre trouvé par le modèle
        }
    },
    { collection: "digits" }
);

const Digit = mongoose.model("Digit", DigitsSchema);
module.exports = Digit;
