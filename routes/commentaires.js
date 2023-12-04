const express = require('express');
// express sert à importer express
const router = express.Router();
// router sert à créer un router
// un router sert à créer des routes
// une route est une URL
const mongoose = require('mongoose');
// mongoose sert à importer mongoose
const Recette = mongoose.model('Recette');
// Recette sert à importer le modèle Recette
const Commentaire = mongoose.model('Commentaire');
// Commentaire sert à importer le modèle Commentaire



// Ajoute un commentaire à une recette
router.post('/ajouter/:idRecette', (req, res) => {
    // cette route sert à ajouter un commentaire à une recette
    // elle est de type post
    // post sert à envoyer des données
    // elle est accessible depuis /commentaires/ajouter/:idRecette
    // :idRecette sert à définir un paramètre dans l'URL
    // req sert à définir la requête
    // res sert à définir la réponse
    const { idRecette } = req.params;
    // idRecette sert à définir la variable qui va contenir l'id de la recette
    // req.params sert à définir les paramètres de la requête
    const { contenu, note, idUtilisateur } = req.body;
    // contenu sert à définir la variable qui va contenir le contenu du commentaire
    // note sert à définir la variable qui va contenir la note du commentaire
    // idUtilisateur sert à définir la variable qui va contenir l'id de l'utilisateur
    // req.body sert à définir le corps de la requête
    // le corps de la requête contient les données envoyées par le formulaire 

    const newCommentaire = new Commentaire({
        // newCommentaire sert à définir la variable qui va contenir le nouveau commentaire
        contenu,
        // contenu sert à définir le champ contenu du commentaire
        note,
        // note sert à définir le champ note du commentaire
        idRecette,
        // idRecette sert à définir le champ idRecette du commentaire
        idUtilisateur 
        // idUtilisateur sert à définir le champ idUtilisateur du commentaire
    });

     newCommentaire.save()
     // newCommentaire.save sert à sauvegarder le nouveau commentaire
        .then(() => {
            // then sert à définir le bloc de code à exécuter si la sauvegarde est réussie
            req.flash('success', 'Commentaire ajouté avec succès !');
            // req.flash sert à définir un message flash
            // success sert à définir le type du message
            res.redirect('/recettes'); 
            // res.redirect sert à rediriger vers une autre page
            // /recettes sert à définir la page vers laquelle on va rediriger
        })
        .catch(err => {
            // catch sert à définir le bloc de code à exécuter si la sauvegarde est échouée
            console.error(err);
            // console.error sert à afficher l'erreur dans la console
            res.status(500).send("Erreur lors de l'ajout du commentaire");
            // res.status sert à définir le code de statut de la réponse
            // 500 sert à définir le code de statut 500
            // send sert à envoyer une réponse
        });
        
});

module.exports = router;
// sert à exporter le router
// il sera importé dans le fichier app.js

