const mongoose = require('mongoose');
// mongoose sert à importer mongoose
// il sert à créer des schémas de données


const recetteSchema = new mongoose.Schema({
    // sert à créer un schéma de données (table)
    titre: String,
    // sert à définir les champs de la collection ici on a un champ nom de type string
    description: String,
    // sert à définir les champs de la collection ici on a un champ description de type string
    tempsDePreparation: Number,
    // sert à définir les champs de la collection ici on a un champ tempsDePreparation de type number
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }],
    // categories sert à définir le champ categories de type ObjectId
    // ref: 'Categorie' sert à définir la référence vers le modèle Categorie
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    // auteur sert à définir le champ auteur de type ObjectId
    // ref: 'Utilisateur' sert à définir la référence vers le modèle Utilisateur
    
});

module.exports = mongoose.model('Recette', recetteSchema);
// sert à exporter le schéma de données
// il sera importé dans le fichier app.js
// mongoose.model sert à créer un modèle mongoose
// Recette sert à définir le nom du modèle
