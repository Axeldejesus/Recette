const mongoose = require('mongoose');
// sert à importer mongoose
// il sert à créer des schémas de données

const ingredientSchema = new mongoose.Schema({
    // sert à créer un schéma de données (table)
    nom: String,
    // sert à définir les champs de la collection ici on a un champ nom de type string
    infosNutri: String,
    // sert à définir les champs de la collection ici on a un champ infosNutri de type string
    
});

mongoose.model('Ingredient', ingredientSchema);
// sert à exporter le schéma de données
// il sera importé dans le fichier app.js
// mongoose.model sert à créer un modèle mongoose
// Ingredient sert à définir le nom du modèle

