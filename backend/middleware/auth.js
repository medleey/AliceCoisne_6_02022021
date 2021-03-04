const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //récupère le 2eme élement du tableau 
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //décode le token, verify (le token) + clé secrete pour la créa du token
    const userId = decodedToken.userId; //récurérer le token du decoded token
    if (req.body.userId && req.body.userId !== userId) { //si userId ne correspond pas au token
      throw 'UserId non valable'; //renvoi l'erreur 
    } else {
      next(); //si tout va bien, passer la requete au prochain middleware
    }
  } catch {
    res.status(401).json({
      error: new Error('Requete invalide')
    });
  }
};