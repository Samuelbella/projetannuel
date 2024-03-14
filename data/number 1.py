

import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
from sklearn.model_selection import GridSearchCV
from tensorflow.keras.utils import to_categorical
import joblib

# Charger les données MNIST
train_data = pd.read_csv(r'C:\wamp\www\projetannuel\data\train.csv')  # Assurez-vous que le fichier contient les labels
test_data = pd.read_csv(r'C:\wamp\www\projetannuel\data\test.csv')

#data
print("train", train_data.shape)
print("test", test_data.shape)

#afficher quelques images
plt.figure(figsize=(10, 10))
for i in range(15):
    plt.subplot(5, 5, i + 1)
    plt.imshow(train_data.iloc[i, 1:].values.reshape(28, 28), cmap="gray")
    plt.title(train_data.iloc[i, 0])
    plt.axis("off")

print(f"Il y a {len(train_data)} images dans le lot d'entraînement et {len(test_data)} images dans le lot de test.")
print(f"Les images sont {28} x {28} pixels et ont {len(train_data.columns) - 1} colonnes.")

# Diviser les données en features (X) et labels (y)
X_train = train_data.drop('label', axis=1)
y_train = train_data['label']

X_test = test_data  # Test data pour l'évaluation finale

# Diviser les données d'entraînement pour la validation
X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.2, random_state=42)



# Initialiser les modèles
decision_tree = DecisionTreeClassifier()
random_forest = RandomForestClassifier()
svm = SVC()

# Entraîner les modèles
decision_tree.fit(X_train, y_train)
random_forest.fit(X_train, y_train)
svm.fit(X_train, y_train)

# Evaluer les modèles sur les données de validation
y_pred_dt = decision_tree.predict(X_val)
accuracy_dt = accuracy_score(y_val, y_pred_dt)

y_pred_rf = random_forest.predict(X_val)
accuracy_rf = accuracy_score(y_val, y_pred_rf)

y_pred_svm = svm.predict(X_val)
accuracy_svm = accuracy_score(y_val, y_pred_svm)

print("Decision Tree Accuracy:", accuracy_dt)
print("Random Forest Accuracy:", accuracy_rf)
print("SVM Accuracy:", accuracy_svm)
'''
############
#optimiser les modèle avec GridSearchCV
############

#Optimisation du Decision Tree Classifier
# Définir les hyperparamètres à rechercher
param_grid_dt = {
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Créer le GridSearchCV
grid_search_dt = GridSearchCV(DecisionTreeClassifier(), param_grid_dt, cv=5, scoring='accuracy')

# Effectuer la recherche sur la grille
grid_search_dt.fit(X_train, y_train)

# Afficher les meilleurs paramètres et le score
print("Meilleurs paramètres pour Decision Tree:", grid_search_dt.best_params_)
print("Meilleur score pour Decision Tree:", grid_search_dt.best_score_)

# Optimisation du Random Forest Classifier
# Définir les hyperparamètres à rechercher
param_grid_rf = {
    'n_estimators': [100, 200, 300],
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Créer le GridSearchCV
grid_search_rf = GridSearchCV(RandomForestClassifier(), param_grid_rf, cv=5, scoring='accuracy')

# Effectuer la recherche sur la grille
grid_search_rf.fit(X_train, y_train)

# Afficher les meilleurs paramètres et le score
print("Meilleurs paramètres pour Random Forest:", grid_search_rf.best_params_)
print("Meilleur score pour Random Forest:", grid_search_rf.best_score_)

# Optimisation du SVM Classifier
# Définir les hyperparamètres à rechercher
param_grid_svm = {
    'C': [0.1, 1, 10],
    'gamma': ['scale', 'auto'],
    'kernel': ['linear', 'rbf']
}

# Créer le GridSearchCV
grid_search_svm = GridSearchCV(SVC(), param_grid_svm, cv=5, scoring='accuracy')

# Effectuer la recherche sur la grille
grid_search_svm.fit(X_train, y_train)

# Afficher les meilleurs paramètres et le score
print("Meilleurs paramètres pour SVM:", grid_search_svm.best_params_)
print("Meilleur score pour SVM:", grid_search_svm.best_score_)

'''
#Meilleurs paramètres pour Decision Tree: {'max_depth': 30, 'min_samples_leaf': 4, 'min_samples_split': 2}
#Meilleur score pour Decision Tree: 0.8542559523809524

#Meilleurs paramÃ¨tres pour Random Forest: {'max_depth': 20, 'min_samples_leaf': 1, 'min_samples_split': 2, 'n_estimators': 300}
#Meilleur score pour Random Forest: 0.9638392857142858

#Meilleurs paramètres pour SVM: {'C': 10, 'gamma': 'scale', 'kernel': 'rbf'}
#Meilleur score pour SVM: 0.9785119047619049

##############
#amélioration
##############

#Entrainer avec les meilleur param
# Utilisation des meilleurs paramètres obtenus
best_params_dt = {'max_depth': 30, 'min_samples_leaf': 4, 'min_samples_split': 2}

# Créer le modèle Decision Tree avec les meilleurs paramètres
decision_tree_best = DecisionTreeClassifier(**best_params_dt)

# Entraîner le modèle avec les données d'entraînement
decision_tree_best.fit(X_train, y_train)

# Évaluer le modèle sur les données de validation
accuracy_dt_best = decision_tree_best.score(X_val, y_val)
print("Accuracy du Decision Tree avec les meilleurs paramètres:", accuracy_dt_best)

#######################
# Utilisation des meilleurs paramètres obtenus
best_params_rf = {'n_estimators': 300, 'max_depth': 20, 'min_samples_split': 2, 'min_samples_leaf': 1}

# Créer le modèle Random Forest avec les meilleurs paramètres
random_forest_best = RandomForestClassifier(**best_params_rf)

# Entraîner le modèle avec les données d'entraînement
random_forest_best.fit(X_train, y_train)

# Évaluer le modèle sur les données de validation
accuracy_rf_best = random_forest_best.score(X_val, y_val)
print("Accuracy du Random Forest avec les meilleurs paramètres:", accuracy_rf_best)


#########################
# Utilisation des meilleurs paramètres obtenus
best_params_svm = {'C': 10, 'gamma': 'scale', 'kernel': 'rbf'}

# Créer le modèle SVM avec les meilleurs paramètres
svm_best = SVC(**best_params_svm)

# Entraîner le modèle avec les données d'entraînement
svm_best.fit(X_train, y_train)

# Évaluer le modèle sur les données de validation
accuracy_svm_best = svm_best.score(X_val, y_val)
print("Accuracy du SVM avec les meilleurs paramètres:", accuracy_svm_best)



########
#Normaliser
########

#normalizing image 
X_train_nor =X_train.astype(float)
X_train_nor =X_train_nor/255
X_val_nor =X_val.astype(float)
X_val_nor =X_val_nor/255
X_test_nor =X_test.astype(float)
X_test_nor =X_test_nor/255


# Initialiser les modèles avec les données normalisées
decision_tree_nor = DecisionTreeClassifier()
random_forest_nor = RandomForestClassifier()
svm_nor = SVC()

# Entraîner les modèles avec les données normalisées
decision_tree_nor.fit(X_train_nor, y_train)
random_forest_nor.fit(X_train_nor, y_train)
svm_nor.fit(X_train_nor, y_train)


# Évaluer les modèles sur les données de validation
y_pred_dt_nor = decision_tree_nor.predict(X_val_nor)
accuracy_dt_nor = accuracy_score(y_val, y_pred_dt_nor)

y_pred_rf_nor = random_forest_nor.predict(X_val_nor)
accuracy_rf_nor = accuracy_score(y_val, y_pred_rf_nor)

y_pred_svm_nor = svm_nor.predict(X_val_nor)
accuracy_svm_nor = accuracy_score(y_val, y_pred_svm_nor)

print("Decision Tree Accuracy (normalized data):", accuracy_dt_nor)
print("Random Forest Accuracy (normalized data):", accuracy_rf_nor)
print("SVM Accuracy (normalized data):", accuracy_svm_nor)





'''
#############
#optimiser les modèle avec GridSearchCV
#############

#Optimisation du Decision Tree Classifier
# Définir les hyperparamètres à rechercher
param_grid_dt_nor = {
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Créer le GridSearchCV
grid_search_dt_nor = GridSearchCV(DecisionTreeClassifier(), param_grid_dt_nor, cv=5, scoring='accuracy')

# Effectuer la recherche sur la grille
grid_search_dt_nor.fit(X_train_nor, y_train)

# Afficher les meilleurs paramètres et le score
print("Meilleurs paramètres pour Decision Tree nor:", grid_search_dt_nor.best_params_)
print("Meilleur score pour Decision Tree nor:", grid_search_dt_nor.best_score_)

# Optimisation du Random Forest Classifier
# Définir les hyperparamètres à rechercher
param_grid_rf_nor = {
    'n_estimators': [100, 200, 300],
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Créer le GridSearchCV
grid_search_rf_nor = GridSearchCV(RandomForestClassifier(), param_grid_rf_nor, cv=5, scoring='accuracy')

# Effectuer la recherche sur la grille
grid_search_rf_nor.fit(X_train_nor, y_train)

# Afficher les meilleurs paramètres et le score
print("Meilleurs paramètres pour Random Forest nor:", grid_search_rf_nor.best_params_)
print("Meilleur score pour Random Forest nor:", grid_search_rf_nor.best_score_)

# Optimisation du SVM Classifier
# Définir les hyperparamètres à rechercher
param_grid_svm_nor = {
    'C': [0.1, 1, 10],
    'gamma': ['scale', 'auto'],
    'kernel': ['linear', 'rbf']
}

# Créer le GridSearchCV
grid_search_svm_nor = GridSearchCV(SVC(), param_grid_svm_nor, cv=5, scoring='accuracy')

# Effectuer la recherche sur la grille
grid_search_svm_nor.fit(X_train_nor, y_train)

# Afficher les meilleurs paramètres et le score
print("Meilleurs paramètres pour SVM nor:", grid_search_svm_nor.best_params_)
print("Meilleur score pour SVM nor :", grid_search_svm_nor.best_score_)

'''

#Meilleurs paramètres pour Decision Tree nor: {'max_depth': 20, 'min_samples_leaf': 4, 'min_samples_split': 2}
#Meilleur score pour Decision Tree nor: 0.8542559523809523

#Meilleurs paramètres pour Random Forest nor: {'max_depth': 30, 'min_samples_leaf': 1, 'min_samples_split': 2, 'n_estimators': 300}
#Meilleur score pour Random Forest nor: 0.964017857142857

#Meilleurs paramètres pour SVM nor: {'C': 10, 'gamma': 'scale', 'kernel': 'rbf'}
#Meilleur score pour SVM nor : 0.9785119047619049



##############
#amélioration normaliser
##############
#Entrainer avec les meilleur param
# Utilisation des meilleurs paramètres obtenus
best_params_dt_nor= {'max_depth': 20, 'min_samples_leaf': 4, 'min_samples_split': 2}

# Créer le modèle Decision Tree avec les meilleurs paramètres
decision_tree_best_nor = DecisionTreeClassifier(**best_params_dt_nor)

# Entraîner le modèle avec les données d'entraînement
decision_tree_best_nor.fit(X_train_nor, y_train)

# Évaluer le modèle sur les données de validation
accuracy_dt_best_nor = decision_tree_best_nor.score(X_val_nor, y_val)
print("Accuracy du Decision Tree avec les meilleurs paramètres(normalized data):", accuracy_dt_best_nor)

#######################
# Utilisation des meilleurs paramètres obtenus
best_params_rf_nor = {'n_estimators': 300, 'max_depth': 30, 'min_samples_split': 2, 'min_samples_leaf': 1}

# Créer le modèle Random Forest avec les meilleurs paramètres
random_forest_best_nor = RandomForestClassifier(**best_params_rf_nor)

# Entraîner le modèle avec les données d'entraînement
random_forest_best_nor.fit(X_train_nor, y_train)

# Évaluer le modèle sur les données de validation
accuracy_rf_best_nor = random_forest_best_nor.score(X_val_nor, y_val)
print("Accuracy du Random Forest avec les meilleurs paramètres (normalized data):", accuracy_rf_best_nor)


#########################
# Utilisation des meilleurs paramètres obtenus
best_params_svm_nor = {'C': 10, 'gamma': 'scale', 'kernel': 'rbf'}

# Créer le modèle SVM avec les meilleurs paramètres
svm_best_nor = SVC(**best_params_svm_nor)

# Entraîner le modèle avec les données d'entraînement
svm_best_nor.fit(X_train_nor, y_train)

# Évaluer le modèle sur les données de validation
accuracy_svm_best_nor = svm_best_nor.score(X_val_nor, y_val)
print("Accuracy du SVM avec les meilleurs paramètres (normalized data):", accuracy_svm_best_nor)


##### Enregistrment des modèles

# Enregistrer le meilleur modèle Decision Tree
joblib.dump(decision_tree_best_nor, 'decision_tree_model.pkl')

# Enregistrer le meilleur modèle Random Forest
joblib.dump(random_forest_best_nor, 'random_forest_model.pkl')

# Enregistrer le meilleur modèle SVM
joblib.dump(svm_best_nor, 'svm_model.pkl')

