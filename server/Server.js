const express = require("express");
const app = express();
const connect = require("./database/connexion");
const cors = require("cors");
const sharp = require("sharp"); // Utilisation de Sharp pour le traitement d'images
const fs = require("fs"); // Module pour la gestion des fichiers
const { Digit } = require("./models/Digit"); // Assurez-vous d'importer votre modèle de données

// Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

connect();

// Route pour recevoir et traiter l'image
app.post("/apiImage/process-and-predict", async (req, res) => {
    const { imageBase64 } = req.body;

    // Convertir l'image base64 en buffer
    const imageBuffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");

    // Enregistrer l'image dans un dossier sur le serveur
    const imageName = `${Date.now()}.png`;
    const imagePath = `./uploads/${imageName}`;
    try {
        // Utiliser Sharp pour transformer l'image en PNG et la redimensionner
        await sharp(imageBuffer)
            .resize(28, 28)
            .toFile(imagePath);

        console.log("Image enregistrée avec succès :", imageName);
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'image :", error);
        res.status(500).json({ error: "Erreur lors de l'enregistrement de l'image" });
        return;
    }

    // Traiter l'image
    const processedImageData = processImage(imagePath);

    const digit = new Digit({
        pixels: processedImageData
    });

    try {
        // Enregistrer les valeurs des pixels dans la collection "digits"
        await digit.save();
        console.log("Données de pixels enregistrées avec succès dans la collection 'digits'");
    } catch (error) {
        console.error("Erreur lors de l'enregistrement des données de pixels :", error);
        res.status(500).json({ error: "Erreur lors de l'enregistrement des données de pixels" });
        return;
    }

    // Prédire l'image
    const prediction = predictImage(processedImageData);

    // Envoyer la prédiction en réponse
    res.status(200).json({ prediction });
});

// Fonction pour traiter l'image
function processImage(imagePath) {
    // Charger l'image avec Sharp
    const image = sharp(imagePath);

    // Convertir l'image en niveaux de gris et la redimensionner
    const resizedImage = image
        .greyscale()
        .normalise()
        .toBuffer();

    // Retourner les données de l'image traitée
    return resizedImage;
}

// Fonction pour prédire l'image
function predictImage(processedImageData) {
    // Charger le modèle à partir du fichier
    const svmModel = joblib.load(".\data\svm_model.pkl");

    // Faire des prédictions pour la nouvelle image avec le modèle SVM
    const prediction = svmModel.predict(processedImageData);

    // Retourner la prédiction
    return prediction;
}

// Lancer le serveur
app.listen(8000, () => {
    console.log("Serveur ouvert sur le port 8000");
});
