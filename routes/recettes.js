const express = require('express');
// utilise express
const router = express.Router();
// utilise router pour créer un router
// un router sert à créer des routes
// une route est une URL
const mongoose = require('mongoose');
// utilise mongoose pour la gestion de la base de données
const Recette = mongoose.model('Recette');
// utilise le modèle Recette
const Commentaire = mongoose.model('Commentaire');
// utilise le modèle Commentaire
const Categorie = mongoose.model('Categorie');
// utilise le modèle Categorie


// Afficher le formulaire d'ajout d'une recette
router.get('/ajouter', (req, res) => {
    // Récupérer les catégories
    // get sert à récupérer des données
    // /ajouter sert à définir l'URL
    res.render('ajouter-recette');
    // res.render sert à afficher la page ajouter-recette
});

router.post('/ajouter', async (req, res) => {
    // Ajouter une recette
    // post sert à envoyer des données
    // /ajouter sert à définir l'URL
    // async sert à définir une fonction asynchrone
    try {
        // Récupérer les données du formulaire
        const { titre, description, categorie } = req.body;
        // titre sert à définir la variable qui va contenir le titre
        // description sert à définir la variable qui va contenir la description
        // categorie sert à définir la variable qui va contenir la catégorie
        // req.body sert à récupérer les données du formulaire
        const nouvelleRecette = new Recette({
            // nouvelleRecette sert à définir la variable qui va contenir la nouvelle recette
            titre,
            // titre sert à définir la variable qui va contenir le titre
            description,
            // description sert à définir la variable qui va contenir la description
            categories: [categorie] 
            // categories sert à définir la variable qui va contenir la catégorie

        });

        await nouvelleRecette.save();
        // await sert à attendre la sauvegarde de la recette
        req.flash('success', 'Recette ajoutée avec succès.');
        // req.flash sert à afficher un message flash
        res.redirect('/recettes');
        // res.redirect sert à rediriger vers la page recettes
    } catch (err) {
        // err sert à définir la variable qui va contenir l'erreur
        console.error(err);
        // console.error sert à afficher l'erreur dans la console
        req.flash('error', 'Erreur lors de l\'ajout de la recette.');
        // req.flash sert à afficher un message flash
        res.redirect('/recettes/ajouter');
        // res.redirect sert à rediriger vers la page ajouter-recette
    }
});

// Modifier une recette
router.get('/modifier/:id', (req, res) => {
    // get sert à récupérer des données
    // /modifier/:id sert à définir l'URL
    Recette.findById(req.params.id)
    // Recette.findById sert à trouver la recette
    // req.params.id sert à récupérer l'ID de la recette
        .then(recette => res.render('modifier-recette', { recette }))
        // then sert à définir le bloc de code à exécuter si la récupération est réussie
        // recette sert à définir la variable qui va contenir la recette
        // res.render sert à afficher la page modifier-recette
        // { recette } sert à définir la variable qui va contenir la recette
        .catch(err => {
            // err sert à définir la variable qui va contenir l'erreur
            console.error(err);
            // console.error sert à afficher l'erreur dans la console
            res.redirect('/recettes');
            // res.redirect sert à rediriger vers la page recettes
        });
});

router.post('/modifier/:id', (req, res) => {
    // post sert à envoyer des données
    // /modifier/:id sert à définir l'URL

    Recette.findByIdAndUpdate(req.params.id, req.body, { new: true })
    // Recette.findByIdAndUpdate sert à trouver la recette et la mettre à jour
    // req.params.id sert à récupérer l'ID de la recette
    // req.body sert à récupérer les données du formulaire
    // { new: true } sert à définir les options
    // c'est à dire à définir que la recette doit être remplacée par la nouvelle recette
        .then(() => {
            // then sert à définir le bloc de code à exécuter si la récupération est réussie
            req.flash('success', 'Recette modifiée avec succès.');
            // req.flash sert à afficher un message flash
            res.redirect('/recettes');
            // res.redirect sert à rediriger vers la page recettes
        })
        .catch(err => {
            // err sert à définir la variable qui va contenir l'erreur
            console.error(err);
            // console.error sert à afficher l'erreur dans la console
            req.flash('error', 'Erreur lors de la modification de la recette.');
            // req.flash sert à afficher un message flash
            res.redirect('/recettes/modifier/' + req.params.id);
            // res.redirect sert à rediriger vers la page modifier-recette
        });
});

// Supprimer une recette
router.get('/supprimer/:id', (req, res) => {
    // get sert à récupérer des données
    // /supprimer/:id sert à définir l'URL
    Recette.findByIdAndDelete(req.params.id)
    // Recette.findByIdAndDelete sert à trouver la recette et la supprimer
    // req.params.id sert à récupérer l'ID de la recette
        .then(() => {
            // then sert à définir le bloc de code à exécuter si la récupération est réussie
            req.flash('success', 'Recette supprimée avec succès.');
            // req.flash sert à afficher un message flash
            res.redirect('/recettes');
            // res.redirect sert à rediriger vers la page recettes
        })
        .catch(err => {
            // err sert à définir la variable qui va contenir l'erreur
            console.error(err);
            // console.error sert à afficher l'erreur dans la console
            req.flash('error', 'Erreur lors de la suppression de la recette.');
            // req.flash sert à afficher un message flash
            res.redirect('/recettes');
            // res.redirect sert à rediriger vers la page recettes
        });
});

// Afficher les recettes
router.get('/', (req, res) => {
    // get sert à récupérer des données
    // / sert à définir l'URL
    Recette.find()
    // Recette.find sert à trouver les recettes
        .then(recettes => res.render('liste-recettes', { recettes, messages: req.flash() }))
        // then sert à définir le bloc de code à exécuter si la récupération est réussie
        // recettes sert à définir la variable qui va contenir les recettes
        // res.render sert à afficher la page liste-recettes
        // { recettes } sert à définir la variable qui va contenir les recettes
        // messages: req.flash() sert à inclure les messages flash
        .catch(err => {
            // err sert à définir la variable qui va contenir l'erreur
            console.error(err);
            // console.error sert à afficher l'erreur dans la console
            res.status(500).send('Erreur lors de la récupération des recettes');
            // res.status sert à définir le code de status
        });
});

// Route pour afficher le détail d'une recette
router.get('/detail/:id', (req, res) => {
    // get sert à récupérer des données
    // /detail/:id sert à définir l'URL
    const id = req.params.id;
    // id sert à définir la variable qui va contenir l'ID de la recette
    // req.params.id sert à récupérer l'ID de la recette

    Recette.findById(id)
    // Recette.findById sert à trouver la recette
    // id sert à définir la variable qui va contenir l'ID de la recette
        .then(recette => {
            // then sert à définir le bloc de code à exécuter si la récupération est réussie
            Commentaire.find({ idRecette: id })
            // Commentaire.find sert à trouver les commentaires
            // { idRecette: id } sert à définir les options
            // c'est à dire à définir que l'ID de la recette doit être égal à l'ID de la recette
                .then(commentaires => {
                    // then sert à définir le bloc de code à exécuter si la récupération est réussie
                    res.render('detail-recette', {
                        // res.render sert à afficher la page detail-recette
                        recette: recette,
                        // recette sert à définir la variable qui va contenir la recette
                        commentaires: commentaires,
                        // commentaires sert à définir la variable qui va contenir les commentaires
                        messages: req.flash() 
                        // messages: req.flash() sert à inclure les messages flash
                    });
                })
                .catch(err => console.error(err));
                // err sert à définir la variable qui va contenir l'erreur
        })
        .catch(err => {
            // err sert à définir la variable qui va contenir l'erreur
            console.error(err);
            // console.error sert à afficher l'erreur dans la console
            res.status(404).send('Recette non trouvée');
            // res.status sert à définir le code de status
        });
});


router.get('/categorie/:categorieId', async (req, res) => {
    // get sert à récupérer des données
    // /categorie/:categorieId sert à définir l'URL
    // async sert à définir une fonction asynchrone
    try {
        // try sert à définir le bloc de code à exécuter
        const recettes = await Recette.find({ categories: req.params.categorieId }).populate('categories');
        // const recettes sert à définir la variable qui va contenir les recettes
        // await sert à attendre la récupération des recettes
        // Recette.find sert à trouver les recettes
        // { categories: req.params.categorieId } sert à définir les options
        // c'est à dire à définir que les catégories de la recette doivent être égales à l'ID de la catégorie
        // .populate('categories') sert à inclure les informations de catégorie
        res.render('liste-recettes', { 
            // res.render sert à afficher la page liste-recettes
            recettes,
            // recettes sert à définir la variable qui va contenir les recettes
            messages: req.flash()
            // messages: req.flash() sert à inclure les messages flash
        });

    } catch (err) {
        // err sert à définir la variable qui va contenir l'erreur
        console.error(err);
        // console.error sert à afficher l'erreur dans la console
        req.flash('error', 'Une erreur est survenue');
        // req.flash sert à afficher un message flash
        res.redirect('/recettes');
        // res.redirect sert à rediriger vers la page recettes
    }
});

router.get('/recherche', async (req, res) => {
    // get sert à récupérer des données
    // /recherche sert à définir l'URL
    try {
        // try sert à définir le bloc de code à exécuter
        const query = {};
        // const query sert à définir la variable qui va contenir la requête
        // {} sert à définir les options
        // c'est à dire à définir que la requête doit être vide
        // sinon la requête ne fonctionnera pas
        if (req.query.titre) {
            // if sert à définir le bloc de code à exécuter si la requête est valide
            query.titre = new RegExp(req.query.titre.trim(), 'i');
            // query.titre sert à définir la variable qui va contenir le titre de la recette
            // new RegExp sert à définir une expression régulière
            // ce qui permet de faire une recherche avec des mots incomplets
            // req.query.titre.trim() sert à définir la variable qui va contenir le titre de la recette
            // .trim() sert à supprimer les espaces avant et après le titre de la recette
            // 'i' sert à définir les options
            // c'est à dire à définir que la recherche doit être insensible à la casse
            // en gros, la recherche ne doit pas tenir compte des majuscules et des minuscules
        }

        const recettes = await Recette.find(query).populate('categories');
        // const recettes sert à définir la variable qui va contenir les recettes
        // await sert à attendre la récupération des recettes
        // Recette.find sert à trouver les recettes
        // query sert à définir les options
        // c'est à dire à définir que la requête doit être vide
        // sinon la requête ne fonctionnera pas
        // .populate('categories') sert à inclure les informations de catégorie 
        console.log("Recettes trouvées :", recettes);
        // console.log sert à afficher les recettes dans la console

        res.render('resultats-recherche', { recettes });
        // res.render sert à afficher la page resultats-recherche
    } catch (err) {
        // err sert à définir la variable qui va contenir l'erreur
        console.error(err);
        // console.error sert à afficher l'erreur dans la console
        res.status(500).send("Erreur lors de la recherche");
        // res.status sert à définir le code de status
    }
});




module.exports = router;
// module.exports sert à exporter le router


