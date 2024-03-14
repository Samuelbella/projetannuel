import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const canvasRef = useRef(null); // Référence au canvas
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
    };

    const handleMouseLeave = () => {
      setIsDrawing(false);
    };

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

  // Fonction pour prédire le chiffre dessiné ----- la logique n'est pas faite encore
  const handlePredict = () => {
    // Envoyer l'image dessinée au serveur pour prédiction
    axios.post('/predict', { digit })
      .then(response => {
        // Mettre à jour l'état avec la prédiction reçue du serveur
        setPrediction(response.data.prediction);
      })
      .catch(error => {
        // Afficher une erreur en cas de problème lors de la prédiction
        console.error('Erreur de prédiction :', error);
        alert('Une erreur s\'est produite lors de la prédiction. Veuillez réessayer.');
      });
  };

  // Fonction pour effacer le contenu du canvas
  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = canvas.width; // Redéfinir la largeur du canvas pour effacer le contenu
    setDigit(null);
    setPrediction(null);
    setIsCleared(true); // Mettre à jour l'état de l'effacement
  };

  return (
    <div className="app-container"> {/* Ajoutez une classe pour le conteneur principal */}
      <h1>Digit Recognition</h1>
      <div>
        {/* Canvas pour dessiner*/}
        <canvas
          ref={canvasRef}
          className="drawing-canvas"
          width="280"
          height="280"
          style={{ border: '1px solid black' }}
        />
      </div>
      {/* Boutons pour prédire le chiffre et effacer le contenu */}
      <div className="button-container"> {/* Ajoutez une classe pour le conteneur des boutons */}
        <button className="predict-button" onClick={handlePredict}>Prédire un Chiffre</button> {/* Ajoutez une classe pour le bouton */}
        <button className="clear-button" onClick={handleClear}>Effacer</button> {/* Ajoutez une classe pour le bouton */}
      </div>
      {/* Afficher la prédiction */}
      {prediction && <h2>Prédiction : {prediction}</h2>}
      {/* Footer */}
      <footer className="footer">
        <p>Ce projet a été réalisé par Julia LOGANATHAN - Samuel BELLAICHE - Sonita MORENCY</p>
      </footer>
    </div>
  );
};

export default App;
