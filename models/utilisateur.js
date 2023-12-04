const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    nom: String,
    email: { type: String, unique: true },
    motDePasse: String,
    role: { type: String, enum: ['utilisateur', 'admin', 'auteur'], default: 'utilisateur' }
});


module.exports = mongoose.model('Utilisateur', utilisateurSchema, 'utilisateurs');

