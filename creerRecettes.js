// const mongoose = require('mongoose');
// const Recette = require('./models/recette'); // Assurez-vous que le chemin est correct
// const Categorie = require('./models/categorie'); // Assurez-vous que le chemin est correct

// mongoose.connect('mongodb://localhost:27017/recettesDB', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connecté à MongoDB'))
//     .catch(err => console.error('Erreur de connexion à MongoDB', err));

// async function trouverOuCreerCategorie(nom) {
//     let categorie = await Categorie.findOne({ nom: nom });
//     if (!categorie) {
//         categorie = new Categorie({ nom: nom });
//         await categorie.save();
//     }
//     return categorie;
// }

// async function creerRecettes() {
//     try {
//         // Créer ou trouver les catégories
//         const categorieDessert = await trouverOuCreerCategorie('Dessert');
//         const categorieVegetarien = await trouverOuCreerCategorie('Végétarien');
//         const categorieRapide = await trouverOuCreerCategorie('Rapide');

//         // Créer les recettes
//         const recette1 = new Recette({
//             titre: 'Gâteau au Chocolat',
//             description: 'Un délicieux gâteau au chocolat fondant et riche en goût.',
//             categories: [categorieDessert._id]
//         });

//         const recette2 = new Recette({
//             titre: 'Salade de Quinoa',
//             description: 'Une salade saine et délicieuse, parfaite pour un repas végétarien.',
//             categories: [categorieVegetarien._id]
//         });

//         const recette3 = new Recette({
//             titre: 'Pâtes à la sauce tomate',
//             description: 'Un plat de pâtes rapide et facile à préparer.',
//             categories: [categorieRapide._id]
//         });

//         // Sauvegarder les recettes
//         await recette1.save();
//         await recette2.save();
//         await recette3.save();

//         console.log('Recettes créées avec succès !');
//     } catch (err) {
//         console.error('Erreur lors de la création des recettes', err);
//     }

//     mongoose.connection.close();
// }

// creerRecettes();

