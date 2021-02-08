const uuid = require('uuid/v1');
const Sauce = require('../models/sauce_model');

exports.getAllSauce = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({error}));
}

exports.postOneSauce = (req, res, next) => { //pour publier la sauce 
  delete req.body._id;
  const sauce = new Sauce ({
    ...req.body //spread ... utilisé pour faire la copie de tous les éléments de req.body
  });
  sauce.save() // renvoie une Promise
  .then(() => res.status(201).json({message: 'Sauce enregistrée!'})) //réponse 201 de réussite
  .catch(error => res.status(400).json({error})); // message d'erreur générée par mongoose + code erreur 400
};
 
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then(sauce => res.status(200).json(sauce))
  .catch(error => res.status(404).json({error})); //objet non trouvé 
}

exports.putOneSauce = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) //permet de mettre à jour 
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.deleteOneSauce = (req, res, next) => { //permet de supprimer une sauce 
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.likeOneSauce = (req, res, next) => {
  Sauce.likeOne
}

