import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const canvasRef = useRef(null); // Référence au canva
  const [isDrawing, setIsDrawing] = useState(false); // État pour indiquer si l'utilisateur est en train de dessiner
  const [digit, setDigit] = useState(null); // Chiffre dessiné par l'utilisateur
  const [prediction, setPrediction] = useState(null); // Prédiction du chiffre
  const [isCleared, setIsCleared] = useState(false); // État pour indiquer si le contenu a été effacé

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Fonction pour dessiner sur le canvas
    const draw = (event) => {
      if (!isDrawing || isCleared) return;

      // Récupérer les coordonnées de la souris dans le canva
      const rect = canvas.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      // Dessiner sur le canvas
      context.lineTo(offsetX, offsetY);
      context.stroke();
    };

    // Événements de la souris pour commencer le dessin, dessiner et arrêter le dessin
    const handleMouseDown = (event) => {
      setIsDrawing(true);
      setIsCleared(false); // Réinitialiser l'état de l'effacement
      draw(event); // Commencer à dessiner dès le clic de la souris
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      setDigit(canvas.toDataURL()); // Convertir le dessin en une URL de données
      sendImageToServer();
    };

    const handleMouseLeave = () => {
      setIsDrawing(false);
    };

    // Configure le contexte du canvas pour le dessin en blanc 
    context.strokeStyle = 'white'; // Couleur du trait en blanc

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);


    // Nettoyer les événements à la fin
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDrawing, isCleared]);

  // Fonction pour envoyer l'image dessinée au serveur
  const sendImageToServer = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL(); // Récupérer l'image du canvas au format base64

    // Envoyer l'image au serveur
    axios.post("http://localhost:8000/apiImage/process-and-predict", { imageBase64: imageData })
      .then(response => {
        // Gérer la réponse du serveur (prédiction du chiffre, etc.)
        console.log("Réponse du serveur :", response.data);
      })
      .catch(error => {
        console.error("Erreur lors de l'envoi de l'image au serveur :", error);
        // Gérer les erreurs
      });
  };

  // Fonction pour effacer le contenu du canvas
  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setDigit(null);
    setPrediction(null);
    setIsCleared(true); // Mettre à jour l'état de l'effacement
  };

  return (
    <div>
      <h1>Application Web de Reconnaissance de Chiffres</h1>
      <div>
        {/* Canvas pour dessiner*/}
        <canvas
          ref={canvasRef}
          width="280"
          height="280"
          style={{ border: '1px solid black', backgroundColor: 'black' }}
        />
      </div>
      {/* Boutons pour prédire le chiffre et effacer le contenu */}
      <div>
        <button onClick={sendImageToServer}>Prédire le Chiffre</button>
        <button onClick={handleClear}>Effacer</button>
      </div>
      {/* Afficher la prédiction */}
      {prediction && <h2>Prédiction : {prediction}</h2>}
    </div>
  );
};

export default App;
