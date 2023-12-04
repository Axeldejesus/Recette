const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
    contenu: String,
    note: Number,
    idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    idRecette: { type: mongoose.Schema.Types.ObjectId, ref: 'Recette' }
});

mongoose.model('Commentaire', commentaireSchema);

