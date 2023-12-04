const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    nom: String,
    infosNutri: String,
    
});

mongoose.model('Ingredient', ingredientSchema);

