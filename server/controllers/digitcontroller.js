//appel du model
const Digits = require('../models/Digits.js')

//afficher tous les Digit
const getDigits = (req, res) => {
    Digits.find()
        .then(Digit => res.status(200).json(Digit))
        .catch(err => res.status(404).json({ notFound: 'Digit non trouvé' }))
};

//afficher un produit par id
const getDigitId = (req, res) => {
    const id = req.params.id;
    Digits.findOne({ id: id })
        .then(Digit => res.status(200).json(Digit))
        .catch(err => res.status(404).json({ notFound: 'Digit non trouvé' }))
};

// Ajouter un Digit
const addDigit = async (pixelsArray) => {
    try {
        const digit = new Digits({ pixels: pixelsArray });
        await digit.save();
        console.log("Données de pixels enregistrées avec succès dans la collection 'digits'");
        return { success: true };
    } catch (error) {
        console.error("Erreur lors de l'enregistrement des données de pixels :", error);
        return { success: false, error: "Erreur lors de l'enregistrement des données de pixels" };
    }
};


// Supprimer un Digits avec id
const deleteDigit = (req, res) => {
    const id = req.params.id;
    Digits.findOneAndDelete({ id: id })
        .then(Digit => res.status(200).json({ result: 'Digits supprimé' }))
        .catch(err => res.status(404).json({ error: 'Digits non supprimé' }));
};


module.exports = { getDigits, addDigit, getDigitId, deleteDigit }