const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/ingredient');
const Ingredient = mongoose.model('Ingredient');

router.get('/', (req, res) => {
    Ingredient.find()
        .then(ingredients => {
            res.render('ingredients', { ingredients }); // 'ingredients' doit correspondre au nom du fichier dans le dossier 'views'
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des ingrédients');
        });
});

module.exports = router;

