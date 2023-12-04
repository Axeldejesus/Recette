const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
    titre: String,
    description: String,
    tempsDePreparation: Number,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }],
    auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    
});

module.exports = mongoose.model('Recette', recetteSchema);
