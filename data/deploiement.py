import cv2
import numpy as np
import joblib
import warnings
import os
import glob
# Ignorer les avertissements concernant les noms de fonctionnalités manquants
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

# Charger le modèle à partir du fichier
#decision_tree_model = joblib.load(r"C:\wamp\www\projetannuel\decision_tree_model.pkl")
#random_forest_model = joblib.load(r"C:\wamp\www\projetannuel\random_forest_model.pkl")
svm_model = joblib.load(r"C:\wamp\www\projetannuel\data\svm_model.pkl")

#################
# Charger l'image
# Chemin du répertoire d'upload
upload_dir = r"C:\wamp\www\projetannuel\server\uploads"

# Obtenir la liste de tous les fichiers dans le répertoire d'upload
files = glob.glob(os.path.join(upload_dir, "*"))

# Trier les fichiers par date de modification (le plus récent en premier)
files.sort(key=os.path.getmtime, reverse=True)

# Prendre le chemin du fichier le plus récent
latest_image_path = files[0]

# Charger l'image la plus récente
image = cv2.imread(latest_image_path)
################
'''
chemin = r"C:\wamp\www\projetannuel\server\uploads\1710465610901.jpg"
image = cv2.imread(chemin)
'''
# Convertir l'image en niveaux de gris
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Redimensionner l'image à la taille 28x28
resized_image = cv2.resize(gray_image, (28, 28))

# Aplatir l'image en un vecteur unidimensionnel de 784 valeurs de pixel
flattened_image = resized_image.flatten()

# Normalisation des données
image_nor = flattened_image / 255.0

# Redimensionner l'image normalisée en une matrice avec une seule ligne
image_nor_reshaped = image_nor.reshape(1, -1)

# Faire des prédictions pour la nouvelle image avec chaque modèle
#prediction_dt = decision_tree_model.predict(image_nor_reshaped)
#prediction_rf = random_forest_model.predict(image_nor_reshaped)
prediction_svm = svm_model.predict(image_nor_reshaped)

#print("Prediction Decision Tree:", prediction_dt)
#print("Prediction Random Forest:", prediction_rf)
print("Prediction SVM:", prediction_svm)

