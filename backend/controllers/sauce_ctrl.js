const uuid = require('uuid/v1');
const Sauce = require('../models/sauce_model');
const fs = require('fs');

const auth = require('../middleware/auth'); //en local
const multer = require('../middleware/multer-config');

//POUR RECHERCHER TOTUES LES SAUCES
exports.getAllSauces = (req, res, next) => { //req = request, res = response 
  Sauce.find()//find va chercher quelque chose, va chercher toutes les sauces de la fonction au dessus
    .then(sauces => res.status(200).json(sauces)) 
    .catch(error => res.status(400).json({ error }));
}

//POUR POSTER UNE SAUCE SUR L'APPLI
exports.postOneSauce = (req, res, next) => { //pour publier la sauce 
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({ //converti la sauce en model, sauce qui est dans la bdd
    ...sauceObject,//spread ... utilisé pour faire la copie de tous les éléments de req.body
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });

  sauce.save() // renvoie une Promise
    .then(() => res.status(201).json({ message: 'Sauce enregistrée!' })) //réponse 201 de réussite
    .catch(error => res.status(400).json({ error })); // message d'erreur générée par mongoose + code erreur 400
};

//POUR CHERCHER UNE SAUCE
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce)) //ok
    .catch(error => res.status(404).json({ error })); //objet non trouvé 
}

//POUR MODIFIER UNE SAUCE
exports.putOneSauce = (req, res, next) => {
  const sauceObject = req.file ? //si nouvelle image, req.file, sinon traité la requete comme objet directement
    {
      ...JSON.parse(req.body.sauce), //récupère la chaine de caractère
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`//permet de modifier une img 
    } : { ...req.body };//corps de la requete 
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //permet de mettre à jour 
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' })) //ok
    .catch(error => res.status(400).json({ error }));
};

//POUR SUPPRIMER UNE SAUCE 
exports.deleteOneSauce = (req, res, next) => { //permet de supprimer une sauce 
  Sauce.findOne({ _id: req.params.id }) //va rechercher la sauce en question
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id }) //supprime la sauce avec l'id recherché 
          .then(() => res.status(200).json({ message: 'Objet supprimé !'})) //ok 
          .catch(error => res.status(400).json({ error }));
      });
    })
};

//POUR LIKER UNE SAUCE 
exports.likeOneSauce = (req, res, next) => {
  Sauce.likeOne({ _id: req.params.id }) 
  .then(() => res.status(200).json({ message: 'Sauce likée!' })) //ok
  .catch(error => res.status(400).json({ error }));
}

