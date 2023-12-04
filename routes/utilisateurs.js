const express = require('express');
// utilise express
const router = express.Router();
// utilise le router d'express
const mongoose = require('mongoose');
// utilise mongoose
const bcrypt = require('bcrypt');
// utilise bcrypt
const Utilisateur = mongoose.model('Utilisateur');
// utilise le modèle Utilisateur
const passport = require('passport');
// utilise passport pour l'authentification

// Inscription
router.get('/inscription', (req, res) => {
    // get pour récupérer les données
    // /inscription pour la route
    // req pour la requête
    // res pour la réponse
    res.render('inscriptions');
    // render pour le rendu de la page
    // 'inscriptions' pour le fichier ejs
});

router.post('/inscription', async (req, res) => {
    // post pour envoyer les données
    // /inscription pour la route
    // async pour la fonction asynchrone
    try {
        // try sera exécuté tant qu'il n'y a pas d'erreur
        const { nom, email, motDePasse, role } = req.body;
        // cette constante récupère les données du formulaire d'inscription
        // nom, email, motDePasse et role sont les noms des champs du formulaire
        // req.body est un objet qui contient les données du formulaire
        const motDePasseHache = await bcrypt.hash(motDePasse, 10);
        // await pour attendre la réponse de la fonction
        // bcrypt.hash pour hasher le mot de passe
        // motDePasse pour le mot de passe à hasher
        // 10 pour le nombre de tours de l'algorithme de hachage
        // pour plus de sécurité, il est recommandé de faire entre 10 et 12 tours
        // plus le nombre de tours est élevé, plus le temps de calcul est long
        // et plus il est difficile de casser le mot de passe
        // bcrypt est une librairie qui permet de hacher le mot de passe

        const utilisateur = new Utilisateur({
            // cette constante crée un nouvel utilisateur
            nom,
            // nom est le nom de l'utilisateur
            email,
            // email est l'email de l'utilisateur
            motDePasse: motDePasseHache,
            // motDePasse est le mot de passe de l'utilisateur
            role: role === 'auteur' ? 'auteur' : 'utilisateur'
            // role est le rôle de l'utilisateur
            // si le rôle est auteur, alors le rôle sera auteur
            // sinon le rôle sera utilisateur
        });

        await utilisateur.save();
        // await pour attendre la réponse de la fonction
        // utilisateur.save pour sauvegarder l'utilisateur dans la base de données
        res.redirect('/recettes');
        // redirige vers la page recettes
    } catch (err) {
        // catch sera exécuté en cas d'erreur
        console.error(err);
        // console.error pour afficher l'erreur dans la console
        res.redirect('/inscription'); 
        // redirige vers la page inscription
    }
});

// Connexion
router.get('/connexion', (req, res) => {
    // get pour récupérer les données
    // /connexion pour la route
    res.render('connexion', { messages: req.flash() });
    // render pour le rendu de la page
    // 'connexion' pour le fichier ejs
    // messages pour les messages flash
});

router.post('/connexion', (req, res, next) => {
    // post pour envoyer les données
    // /connexion pour la route
    // next pour passer à la fonction suivante
    // next sera exécuté si la fonction n'est pas terminée
    passport.authenticate('local', (err, utilisateur, info) => {
        // passport.authenticate pour authentifier l'utilisateur
        // 'local' pour la stratégie d'authentification
        // err pour l'erreur
        // utilisateur pour l'utilisateur
        // pour expliquer passport.authenticate, il faut comprendre le fonctionnement de passport
        // passport est un middleware qui permet de gérer l'authentification
        // un middleware est une fonction qui est exécutée avant une autre fonction
        // passport.authenticate est un middleware qui est exécuté avant la fonction (req, res, next)
        // passport.authenticate vérifie si l'utilisateur existe dans la base de données
        // si l'utilisateur existe, alors il est authentifié
        // sinon il n'est pas authentifié
        if (err) {
            // si il y a une erreur
            return next(err);
            // next pour passer à la fonction suivante
        }

        if (!utilisateur) {
            // si l'utilisateur n'existe pas
            req.flash('erreurConnexion', 'Email ou mot de passe erroné.');
            // req.flash pour afficher un message flash
            return res.render('connexion', { messages: req.flash() });
            // render pour le rendu de la page
            // 'connexion' pour le fichier ejs
            // messages pour les messages flash
        }

        req.logIn(utilisateur, (err) => {
            // req.logIn pour connecter l'utilisateur
            // utilisateur pour l'utilisateur
            // err pour l'erreur
            if (err) {
                // si il y a une erreur
                return next(err);
                // next pour passer à la fonction suivante
            }
            return res.redirect('/recettes');
            // redirige vers la page recettes
        });
    })(req, res, next);
    // (req, res, next) pour passer à la fonction suivante
});

module.exports = router;
// exporte le router


