const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
    {
        name: String,             // Nom du fichier
        contentType: String,      // Type de contenu (ex. image/jpeg)
        size: Number,             // Taille du fichier en octets
        data: Buffer              // Données binaires de l'image
    },
    { collection: "images" }
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
