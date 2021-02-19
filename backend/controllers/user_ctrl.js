const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user_model');

//POUR S'INSCRIRE
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
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
        return res.status(401).json({ error: 'Utilisateur non trouvé !' }); //si le user n'est pas trouvé, va afficher un message d'erreur 
      }
      console.log(req.body.password);
      console.log(user.password); 
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => {
          res.status(500).json({ error });
          console.log(error)
        });
    })
    .catch(error => res.status(500).json({ error }));
};