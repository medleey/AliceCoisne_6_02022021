const uuid = require('uuid/v1');
const Sauce = require('../models/sauce_model');
const fs = require('fs');

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
}

exports.postOneSauce = (req, res, next) => { //pour publier la sauce 
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,//spread ... utilisé pour faire la copie de tous les éléments de req.body
    imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save() // renvoie une Promise
    .then(() => res.status(201).json({ message: 'Sauce enregistrée!' })) //réponse 201 de réussite
    .catch(error => res.status(400).json({ error })); // message d'erreur générée par mongoose + code erreur 400
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error })); //objet non trouvé 
}

exports.putOneSauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageURL: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //permet de mettre à jour 
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteOneSauce = (req, res, next) => { //permet de supprimer une sauce 
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.likeOneSauce = (req, res, next) => {
  Sauce.likeOne
}

