const mongoose = require('mongoose');
// mongoose sert à importer mongoose
// il sert à créer des schémas de données

const utilisateurSchema = new mongoose.Schema({
    // sert à créer un schéma de données (table)
    nom: String,
    // sert à définir les champs de la collection ici on a un champ nom de type string
    email: { type: String, unique: true },
    // sert à définir les champs de la collection ici on a un champ email de type string
    // type: String sert à définir le type de la donnée
    // unique: true sert à définir que la donnée doit être unique
    // c'est à dire qu'il ne peut pas y avoir deux utilisateurs avec le même email
    motDePasse: String,
    // sert à définir les champs de la collection ici on a un champ motDePasse de type string
    role: { type: String, enum: ['utilisateur', 'admin', 'auteur'], default: 'utilisateur' }
    // sert à définir les champs de la collection ici on a un champ role de type string
    // enum: ['utilisateur', 'admin', 'auteur'] sert à définir les valeurs possibles pour le champ role
    // default: 'utilisateur' sert à définir la valeur par défaut pour le champ role
});


module.exports = mongoose.model('Utilisateur', utilisateurSchema, 'utilisateurs');
// sert à exporter le schéma de données
// il sera importé dans le fichier app.js
// mongoose.model sert à créer un modèle mongoose
// Utilisateur sert à définir le nom du modèle
// utilisateurSchema sert à définir le schéma de données
// utilisateurs sert à définir le nom de la collection

