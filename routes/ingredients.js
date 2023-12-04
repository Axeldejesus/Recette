const express = require('express');
// express sert à importer express
const router = express.Router();
// router sert à créer un router
// un router sert à créer des routes
// une route est une URL
const mongoose = require('mongoose');
// mongoose sert à importer mongoose
const Ingredient = mongoose.model('Ingredient');
// Ingredient sert à importer le modèle Ingredient

router.get('/', (req, res) => {
    // cette route sert à afficher les ingrédients
    // elle est de type get
    // get sert à récupérer des données
    Ingredient.find()
    // Ingredient.find sert à trouver les ingrédients
        .then(ingredients => {
            // then sert à définir le bloc de code à exécuter si la récupération est réussie
            // ingredients sert à définir la variable qui va contenir les ingrédients
            res.render('ingredients', { ingredients }); 
            // res.render sert à afficher la page ingrédients
            // ingredients sert à définir la variable qui va contenir les ingrédients
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des ingrédients');
        });
});

module.exports = router;
// sert à exporter le router
// c'est à dire à rendre le router accessible depuis les autres fichiers

