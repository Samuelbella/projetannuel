const mongoose = require("mongoose");

// Définir le schéma des pixels
const pixelSchema = {};
for (let i = 1; i <= 784; i++) {
    pixelSchema[`pixel_${i}`] = {
        type: Number, // Chaque pixel est un nombre
        required: true
    };
}

// Créer le schéma complet pour les digits
const DigitsSchema = new mongoose.Schema(
    {
        ...pixelSchema, // Ajouter les colonnes de pixels au schéma
        label: {
            type: Number // Nombre trouvé par le modèle
        }
    },
    { collection: "digits" }
);

// Créer le modèle Digit à partir du schéma
const Digit = mongoose.model("Digit", DigitsSchema);

// Exporter le modèle Digit
module.exports = Digit;
