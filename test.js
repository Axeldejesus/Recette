// const mongoose = require('mongoose');

// // URL de connexion à la base de données MongoDB
// const uri = 'mongodb://localhost:27017/recettesDB'; 

// mongoose.connect(uri)
//   .then(async () => {
//     console.log('MongoDB Connected');

//     // Schémas et modèles
//     const userSchema = new mongoose.Schema({
//       nom: String,
//       email: String,
//       motDePasse: String,
//       role: String,
//     });
//     const User = mongoose.model('Utilisateur', userSchema);

//     const recetteSchema = new mongoose.Schema({
//       titre: String,
//       description: String,
//       tempsDePreparation: Number,
//       auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
//     });
//     const Recette = mongoose.model('Recette', recetteSchema);

//     const categorieSchema = new mongoose.Schema({
//       nom: String,
//     });
//     const Categorie = mongoose.model('Categorie', categorieSchema);

//     const ingredientSchema = new mongoose.Schema({
//       nom: String,
//       infosNutri: String,
//     });
//     const Ingredient = mongoose.model('Ingredient', ingredientSchema);

//     const commentaireSchema = new mongoose.Schema({
//       contenu: String,
//       note: Number,
//       idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
//       idRecette: { type: mongoose.Schema.Types.ObjectId, ref: 'Recette' },
//     });
//     const Commentaire = mongoose.model('Commentaire', commentaireSchema);

//     // Insertion des utilisateurs
//    

//     // Insertion des catégories
//     const categorieDocs = await Categorie.insertMany([
//       { nom: 'Dessert' },
//       { nom: 'Végétarien' },
//       { nom: 'Rapide' },
//     ]);
//     console.log('Catégories insérées', categorieDocs);

//     // Insertion des ingrédients
//     const ingredientDocs = await Ingredient.insertMany([
//       { nom: 'Farine', infosNutri: 'Calories: 364 par 100g' },
//       { nom: 'Sucre', infosNutri: 'Calories: 387 par 100g' },
//       { nom: 'Chocolat', infosNutri: 'Calories: 546 par 100g' },
//     ]);
//     console.log('Ingrédients insérés', ingredientDocs);

//     // Insertion des recettes
//     const recetteDocs = await Recette.insertMany([
//       { titre: 'Gâteau au chocolat', description: 'Un délicieux gâteau au chocolat moelleux.', tempsDePreparation: 60, auteur: userDocs[0]._id },
//       { titre: 'Salade César', description: 'Une salade César classique et rafraîchissante.', tempsDePreparation: 30, auteur: userDocs[1]._id },
//     ]);
//     console.log('Recettes insérées', recetteDocs);

//     // Insertion des commentaires
//     const commentaireDocs = await Commentaire.insertMany([
//       { contenu: "Très bonne recette, facile à suivre.", note: 5, idUtilisateur: userDocs[0]._id, idRecette: recetteDocs[0]._id },
//       { contenu: "Bon, mais un peu trop sucré à mon goût.", note: 3, idUtilisateur: userDocs[1]._id, idRecette: recetteDocs[0]._id },
//     ]);
//     console.log('Commentaires insérés', commentaireDocs);

//     // Fermeture de la connexion
//     mongoose.connection.close();
//   })
//   .catch(err => {
//     console.error(err);
//     mongoose.connection.close();
//   });

  








