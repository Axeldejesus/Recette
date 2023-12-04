const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recette = mongoose.model('Recette');
const Commentaire = mongoose.model('Commentaire');

// Ajouter un commentaire à une recette
router.post('/ajouter/:idRecette', (req, res) => {
    const { idRecette } = req.params;
    const { contenu, note, idUtilisateur } = req.body; 

    const newCommentaire = new Commentaire({
        contenu,
        note,
        idRecette,
        idUtilisateur 
    });

     newCommentaire.save()
        .then(() => {
            req.flash('success', 'Commentaire ajouté avec succès !');
            res.redirect('/recettes'); 
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Erreur lors de l'ajout du commentaire");
        });
        
});

module.exports = router;
