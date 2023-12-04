const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Utilisateur = require('./models/utilisateur'); 


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurer la session
app.use(session({
    secret: 'secretUnique', // Changez ceci pour un secret unique
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Mettez 'true' si vous êtes en HTTPS
}));

// Initialiser Connect-Flash
app.use(flash());

// Middleware pour le parsing des formulaires et fichiers statiques
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuration de Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
      try {
          console.log(`Recherche de l'utilisateur avec l'email : ${email}`);
          const utilisateur = await Utilisateur.findOne({ email: email });

          if (!utilisateur) {
              console.log(`Aucun utilisateur trouvé avec l'email : ${email}`);
              return done(null, false, { message: 'Email non trouvé' });
          }

          console.log(`Utilisateur trouvé. Comparaison des mots de passe...`);
          const correspondance = await bcrypt.compare(password, utilisateur.motDePasse);

          if (!correspondance) {
              console.log(`Mot de passe incorrect pour l'email : ${email}`);
              return done(null, false, { message: 'Mot de passe incorrect' });
          }

          console.log(`Authentification réussie pour l'email : ${email}`);
          return done(null, utilisateur);
      } catch (err) {
          console.error('Erreur lors de l\'authentification', err);
          return done(err);
      }
  }
));


passport.serializeUser((utilisateur, done) => {
    done(null, utilisateur.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const utilisateur = await Utilisateur.findById(id);
      done(null, utilisateur);
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
const indexRouter = require('./routes/index');
const utilisateursRouter = require('./routes/utilisateurs');
const recettesRouter = require('./routes/recettes');
const ingredientsRouter = require('./routes/ingredients');
const commentairesRouter = require('./routes/commentaires');


app.get('/', (req, res) => {
  res.render('accueil'); 
});


// Utilisation des routes
app.use('/', indexRouter);
app.use('/utilisateurs', utilisateursRouter);
app.use('/recettes', recettesRouter);
app.use('/ingredient', ingredientsRouter);
app.use('/commentaires', commentairesRouter);

// Gestion des erreurs
app.use((req, res, next) => {
    res.status(404).send("Désolé, page non trouvée !");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});




