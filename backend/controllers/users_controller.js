const bcrypt = require('bcrypt'); //données de cryptage et hachage 
const jwt = require('jsonwebtoken');

const User = require('../models/user_model');

//POUR S'INSCRIRE
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) // plus il y a de boucles, plus c'est dur de casser de code = salage du mdp
    .then(hash => {
      //ajouter regexp 
      const reEmail = (/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i); //vérifie que l'email est correctement saisi
      let formValide = reEmail.test(email.toLowerCase());
      if (formValide) { 
        email
        .then(() => res.status(201).json({
          message: 'adresse mail valide'
        }))
        .catch(error => res.status(400).json({ 
          message: 'adresse mail non valide' }));
        };
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({
          message: 'Utilisateur créé !'
        }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//POUR SE CONNECTER
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) //va rechercher l'adresse mail entrée 
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' }); 
      }
      bcrypt.compare(req.body.password, user.password) //Compare le password dans la BDD avec celui du user 
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign( //encode le nouveau token
              { userId: user._id },
              'RANDOM_TOKEN_SECRET', //chaine de caractères secrets 
              { expiresIn: '24h' } //le token expire au bout de 24h
            )
          });
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    })
    .catch(error => res.status(500).json({ error }));
};