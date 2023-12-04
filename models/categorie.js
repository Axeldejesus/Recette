const mongoose = require('mongoose');
// mongoose sert à importer mongoose 
// il sert à créer des schémas de données

const categorieSchema = new mongoose.Schema({
    // sert à créer un schéma de données
    // un schéma de données sert à définir la structure d'une collection (table)
    nom: String
    // sert à définir les champs de la collection
    // ici on a un champ nom de type string
    
});

module.exports = mongoose.model('Categorie', categorieSchema);
// sert à exporter le schéma de données
// il sera importé dans le fichier app.js
// mongoose.model sert à créer un modèle mongoose
// Categorie sert à définir le nom du modèle
// categorieSchema sert à définir le schéma de données

