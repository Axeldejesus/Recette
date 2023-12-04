const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Recette = mongoose.model('Recette');
const Commentaire = mongoose.model('Commentaire');
const Categorie = mongoose.model('Categorie');

// Ajouter une recette
router.get('/ajouter', (req, res) => {
    res.render('ajouter-recette');
});

router.post('/ajouter', async (req, res) => {
    try {
        const { titre, description, categorie } = req.body;
        const nouvelleRecette = new Recette({
            titre,
            description,
            categories: [categorie] // Ajoutez l'ID de la catégorie sélectionnée
        });

        await nouvelleRecette.save();
        req.flash('success', 'Recette ajoutée avec succès.');
        res.redirect('/recettes');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Erreur lors de l\'ajout de la recette.');
        res.redirect('/recettes/ajouter');
    }
});

// Modifier une recette
router.get('/modifier/:id', (req, res) => {
    Recette.findById(req.params.id)
        .then(recette => res.render('modifier-recette', { recette }))
        .catch(err => {
            console.error(err);
            res.redirect('/recettes');
        });
});

router.post('/modifier/:id', (req, res) => {
    Recette.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => {
            req.flash('success', 'Recette modifiée avec succès.');
            res.redirect('/recettes');
        })
        .catch(err => {
            console.error(err);
            req.flash('error', 'Erreur lors de la modification de la recette.');
            res.redirect('/recettes/modifier/' + req.params.id);
        });
});

// Supprimer une recette
router.get('/supprimer/:id', (req, res) => {
    Recette.findByIdAndDelete(req.params.id)
        .then(() => {
            req.flash('success', 'Recette supprimée avec succès.');
            res.redirect('/recettes');
        })
        .catch(err => {
            console.error(err);
            req.flash('error', 'Erreur lors de la suppression de la recette.');
            res.redirect('/recettes');
        });
});

// Afficher les recettes
router.get('/', (req, res) => {
    Recette.find()
        .then(recettes => res.render('liste-recettes', { recettes, messages: req.flash() }))
        .catch(err => {
            console.error(err);
            res.status(500).send('Erreur lors de la récupération des recettes');
        });
});

// Route pour afficher le détail d'une recette
router.get('/detail/:id', (req, res) => {
    const id = req.params.id;

    Recette.findById(id)
        .then(recette => {
            Commentaire.find({ idRecette: id })
                .then(commentaires => {
                    res.render('detail-recette', {
                        recette: recette,
                        commentaires: commentaires,
                        messages: req.flash() // Transmettre les messages flash
                    });
                })
                .catch(err => console.error(err));
        })
        .catch(err => {
            console.error(err);
            res.status(404).send('Recette non trouvée');
        });
});
router.get('/categorie/:categorieId', async (req, res) => {
    try {
        const recettes = await Recette.find({ categories: req.params.categorieId }).populate('categories');
        res.render('liste-recettes', { 
            recettes,
            messages: req.flash() // Inclure les messages flash
        });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Une erreur est survenue');
        res.redirect('/recettes');
    }
});





module.exports = router;


