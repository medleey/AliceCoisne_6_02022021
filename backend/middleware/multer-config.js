const multer = require('multer'); //importation de multer

const MIME_TYPES = { //génère l'extension du fichier
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({            //enregistret sur le disque
  destination: (req, file, callback) => {       //fonction qui va retourner à multer ou save le fichier 
    callback(null, 'images');                   //null= pas d'erreur à cet endroit, 2e arg : dossier de destination
  },
  filename: (req, file, callback) => {          // explique à multer quel nom de fichier utiliser
    const name = file.originalname.split(' ').join('_'); //génère le nouveau nom du fichier 
    const extension = MIME_TYPES[file.mimetype];        //élément du dico qui correspond au mine-type du fichier envoyé par le front
    callback(null, name.split('.')[0] + '_' + Date.now() + '.' + extension); //date.now = ajoute un time stamp pour le rendre le plus unique possible
  }
});

module.exports = multer({storage: storage}).single('image'); //fichier unique (et non pas grupe de fichier), fichier image uniquement 