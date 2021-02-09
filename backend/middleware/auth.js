const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //récupère le 2eme élement du tableau 
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next(); //si tout va bien, étape suivante au prochain middleware
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};