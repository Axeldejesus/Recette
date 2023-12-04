const express = require('express');
// utilise express
const mongoose = require('mongoose');
// utilise mongoose
const session = require('express-session');
// utilise express-session pour la gestion des sessions cela permet de stocker des données utilisateur
const flash = require('connect-flash');
// utilise connect-flash pour afficher des messages flash
const path = require('path');
// utilise path pour la gestion des chemins
const passport = require('passport');
// utilise passport pour l'authentification
const LocalStrategy = require('passport-local').Strategy;
// utilise passport-local pour l'authentification locale (email + mot de passe) 
// .Strategy est une classe qui permet de créer une stratégie d'authentification
const bcrypt = require('bcrypt');
// utilise bcrypt pour le hashage des mots de passe (cryptage)
const Utilisateur = require('./models/utilisateur'); 
// utilise le modèle utilisateur


const app = express();
// sert à créer une application express
app.set('view engine', 'ejs');
// sert à définir le moteur de template ici ejs (embedded javascript)
app.set('views', path.join(__dirname, 'views'));
// sert à définir le dossier des vues ici views

// Configuration de la session
app.use(session({
    secret: 'secretUnique', 
    // sert à définir la clé secrète utilisée pour signer les cookies
    resave: false,
    // sert à définir si la session doit être sauvegardée à chaque requête
    saveUninitialized: false,
    // sert à définir si la session doit être sauvegardée même si elle est vide
    cookie: { secure: false } 
    // sert à définir si le cookie doit être envoyé uniquement via HTTPS
    // false car on est en local
    // true si on est en production
}));

// Initialiser Connect-Flash
app.use(flash());

// Middleware pour le parsing des formulaires et fichiers statiques
// Cette partie sert à parser les données du formulaire et les fichiers statiques
// c'est à dire à les rendre utilisables par le serveur
app.use(express.urlencoded({ extended: true }));
// sert à parser les données du formulaire
app.use(express.static(path.join(__dirname, 'public')));
// sert à parser les fichiers statiques

// Configuration de Passport
// c'est à dire à définir les stratégies d'authentification
app.use(passport.initialize());
// sert à initialiser passport
app.use(passport.session());
// sert à utiliser les sessions avec passport

passport.use(new LocalStrategy(
    // sert à définir la stratégie d'authentification locale
    // c'est à dire à définir comment on va authentifier un utilisateur
  { usernameField: 'email' },
    // sert à définir le champ qui va servir à l'authentification
    // ici c'est l'email
  async (email, password, done) => {
    // async sert à définir une fonction asynchrone
    // c'est à dire une fonction qui va attendre une réponse du serveur
    // done sert à définir la fonction qui va être appelée une fois que le serveur aura répondu
      try {
        // try sert à définir le bloc de code à exécuter
          console.log(`Recherche de l'utilisateur avec l'email : ${email}`);
          const utilisateur = await Utilisateur.findOne({ email: email });
          // utilisateur sert à définir la variable qui va contenir l'utilisateur
          // await sert à attendre la réponse du serveur
          // Utilisateur sert à définir le modèle utilisateur
            // findOne sert à trouver un utilisateur avec un email

          if (!utilisateur) {
            // sert à vérifier si l'utilisateur existe
            // si l'utilisateur n'existe pas
            // alors on retourne done avec un message d'erreur
              console.log(`Aucun utilisateur trouvé avec l'email : ${email}`);
              return done(null, false, { message: 'Email non trouvé' });
          }

          console.log(`Utilisateur trouvé. Comparaison des mots de passe...`);
          const correspondance = await bcrypt.compare(password, utilisateur.motDePasse);
            // correspondance sert à définir la variable qui va contenir le résultat de la comparaison
            // await sert à attendre la réponse du serveur
            // bcrypt sert à définir le module bcrypt
            // bcrypt sert à crypter les mots de passe
            // compare sert à comparer le mot de passe entré par l'utilisateur avec le mot de passe crypté dans la base de données
            // password sert à définir le mot de passe entré par l'utilisateur
            // utilisateur.motDePasse sert à définir le mot de passe crypté dans la base de données

          if (!correspondance) {
            // sert à vérifier si les mots de passe correspondent
            // si les mots de passe ne correspondent pas
            // alors on retourne done avec un message d'erreur
              console.log(`Mot de passe incorrect pour l'email : ${email}`);
              return done(null, false, { message: 'Mot de passe incorrect' });
          }

          console.log(`Authentification réussie pour l'email : ${email}`);
          return done(null, utilisateur);
            // sert à retourner done avec l'utilisateur
        
      } catch (err) {
          console.error('Erreur lors de l\'authentification', err);
          return done(err);
      }
  }
));


passport.serializeUser((utilisateur, done) => {
    // sert à définir la fonction qui va être appelée pour sérialiser l'utilisateur
    // c'est à dire pour stocker l'utilisateur dans la session
    done(null, utilisateur.id);
    // done sert à retourner la fonction
});

passport.deserializeUser(async (id, done) => {
    // sert à définir la fonction qui va être appelée pour désérialiser l'utilisateur
    // c'est à dire pour récupérer l'utilisateur depuis la session
  try {
    // try sert à définir le bloc de code à exécuter
      const utilisateur = await Utilisateur.findById(id);
      // utilisateur sert à définir la variable qui va contenir l'utilisateur
        // await sert à attendre la réponse du serveur
        // Utilisateur sert à définir le modèle utilisateur
          // findById sert à trouver un utilisateur avec un id
      done(null, utilisateur);
        // done sert à retourner la fonction
  } catch (err) {
      done(err);
  }
});

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/recettesDB')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// Import des modèles
require('./models/utilisateur');
require('./models/recette');
require('./models/categorie');
require('./models/ingredient');
require('./models/commentaire');

// Import des routes

const utilisateursRouter = require('./routes/utilisateurs');
const recettesRouter = require('./routes/recettes');
const ingredientsRouter = require('./routes/ingredients');
const commentairesRouter = require('./routes/commentaires');

// Page d'accueil
app.get('/', (req, res) => {
  res.render('accueil'); 
});


// Utilisation des routes

app.use('/utilisateurs', utilisateursRouter);
app.use('/recettes', recettesRouter);
app.use('/ingredient', ingredientsRouter);
app.use('/commentaires', commentairesRouter);

// Gestion des erreurs
app.use((req, res, next) => {
    // req sert à définir la requête
    // res sert à définir la réponse
    // next sert à définir la fonction qui va être appelée pour passer à la suite
    res.status(404).send("Désolé, page non trouvée !");
});

const PORT = process.env.PORT || 8000;
// sert à définir le port du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});




