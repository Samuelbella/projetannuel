const express = require("express");
const app = express();
const cors = require("cors");
const sharp = require("sharp"); // Utilisation de Sharp pour le traitement d'images
const path = require("path");
const fs = require('fs');
//const svm = require('svm');
//const mongoose = require('mongoose');
const { spawn } = require('child_process');

// Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));



// Route pour recevoir et traiter l'image
app.post("/apiImage/process-and-predict", async (req, res) => {
    const { imageBase64 } = req.body;

    // Convertir l'image base64 en buffer
    const imageBuffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), "base64");





    // Enregistrer l'image dans un dossier sur le serveur
    const imageName = `${Date.now()}.jpg`;
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
    const processedImageData = await processImage(imagePath);


    // Convertir les données de l'image en tableau de pixels
    const pixelsArray = Array.from(processedImageData);

    // Afficher les valeurs des pixels dans la console
    console.log("Valeurs des pixels :", pixelsArray);
    /*
            const result = await DigitController.addDigit(pixelsArray); // Appel de la fonction addDigit
    
            if (!result.success) {
                throw new Error(result.error);
            }
    
    // Prédire l'image
    const prediction = predictImage(processedImageData);

    // Envoyer la prédiction en réponse
    res.status(200).json({ prediction });
    */
});

// Fonction pour traiter l'image
async function processImage(imagePath) {
    // Charger l'image avec Sharp
    const image = sharp(imagePath);

    // Convertir l'image en niveaux de gris et la redimensionner
    const resizedImage = await image
        .greyscale()
        .normalise()
        .raw()
        .toBuffer();

    // Retourner les données de l'image traitée
    return resizedImage;
}
/*
// Fonction pour prédire l'image
function predictImage(processedImageData) {
    // Charger le modèle à partir du fichier (à remplacer par votre propre chargement de modèle)
    const svmModel = loadSVMModel(); // Assurez-vous de définir cette fonction pour charger votre modèle

    // Faire des prédictions pour la nouvelle image avec le modèle SVM
    try {
        const prediction = svmModel.predict(processedImageData);
        console.log(predictions);
        // Retourner la prédiction
        return prediction;
    } catch (error) {
        console.error("Erreur lors de la prédictionavec la modèle SVM :", error);
        return null;
    }
}

// Fonction pour charger le modèle SVM
function loadSVMModel() {
    // Spécifiez le chemin vers votre modèle SVM
    const modelPath = path.join(__dirname, "../data/svm_model.pkl");

    // Chargez votre modèle à partir du fichier
    try {
        const svmModel = fs.readFileSync(modelPath, 'utf8'); // Chargez votre modèle selon le format approprié
        return svmModel;
    } catch (error) {
        console.error("Erreur lors du chargement du modèle SVM :", error);
        return null;
    }
}
*/

// Route pour afficher le résultat de l'exécution du script Python
app.get("/apiImage/show-python-result", (req, res) => {
    const pythonScriptPath = 'C:/wamp/www/projetannuel/data/deploiement.py';

    // Exécuter le script Python
    const pythonProcess = spawn('python', [pythonScriptPath]);

    // Capturer la sortie du processus Python
    let pythonOutput = '';
    pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
    });

    // Gérer les erreurs de l'exécution du script Python
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Erreur lors de l'exécution du script Python : ${data}`);
        res.status(500).json({ error: "Erreur lors de l'exécution du script Python" });
    });

    // Lorsque le processus Python est terminé, envoyer la réponse avec le résultat
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            res.status(200).json({ output: pythonOutput });
        }
    });
});

// Lancer le serveur
app.listen(8000, () => {
    console.log("Serveur ouvert sur le port 8000");
});