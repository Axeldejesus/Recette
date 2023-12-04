const mongoose = require('mongoose');
// mongoose sert à importer mongoose 
// il sert à créer des schémas de données

const commentaireSchema = new mongoose.Schema({
    // sert à créer un schéma de données
    // un schéma de données sert à définir la structure d'une collection (table)
    contenu: String,
    // sert à définir les champs de la collection ici on a un champ nom de type string
    note: Number,
    // sert à définir les champs de la collection ici on a un champ nom de type number
    idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    // idUtilisateur sert à définir le champ idUtilisateur de type ObjectId
    // ref: 'Utilisateur' sert à définir la référence vers le modèle Utilisateur
    idRecette: { type: mongoose.Schema.Types.ObjectId, ref: 'Recette' }
    // idRecette sert à définir le champ idRecette de type ObjectId
    // ref: 'Recette' sert à définir la référence vers le modèle Recette
});

mongoose.model('Commentaire', commentaireSchema);
// sert à exporter le schéma de données
// il sera importé dans le fichier app.js
// mongoose.model sert à créer un modèle mongoose
// Commentaire sert à définir le nom du modèle

