const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Utilisateur = mongoose.model('Utilisateur');
const passport = require('passport');

// Inscription
router.get('/inscription', (req, res) => {
    res.render('inscriptions'); // Utilisation de inscriptions.ejs
});

router.post('/inscription', async (req, res) => {
    try {
        const { nom, email, motDePasse, role } = req.body;
        const motDePasseHache = await bcrypt.hash(motDePasse, 10);

        const utilisateur = new Utilisateur({
            nom,
            email,
            motDePasse: motDePasseHache,
            role: role === 'auteur' ? 'auteur' : 'utilisateur'
        });

        await utilisateur.save();
        res.redirect('/recettes'); // Redirection vers la page de recettes après inscription
    } catch (err) {
        console.error(err);
        res.redirect('/inscription'); // En cas d'erreur, rediriger vers le formulaire d'inscription
    }
});

// Connexion
router.get('/connexion', (req, res) => {
    res.render('connexion', { messages: req.flash() });
});

router.post('/connexion', (req, res, next) => {
    passport.authenticate('local', (err, utilisateur, info) => {
        if (err) {
            return next(err);
        }

        if (!utilisateur) {
            req.flash('erreurConnexion', 'Email ou mot de passe erroné.');
            return res.render('connexion', { messages: req.flash() }); // Rendu direct de la page avec le message d'erreur
        }

        req.logIn(utilisateur, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/recettes');
        });
    })(req, res, next);
});




module.exports = router;


