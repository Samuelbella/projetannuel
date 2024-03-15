const mongoose = require('mongoose');

// Définition du schéma du modèle
const digitSchema = new mongoose.Schema({
    pixels: [Number]
});

// Création du modèle à partir du schéma
const Digit = mongoose.model('Digit', digitSchema);

module.exports = Digit;
