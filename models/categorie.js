const mongoose = require('mongoose');

const categorieSchema = new mongoose.Schema({
    nom: String
    
});

module.exports = mongoose.model('Categorie', categorieSchema);

