const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); //null= pas d'erreur à cet endroit 
  },
  filename: (req, file, callback) => { // explique à multer quel nom de fichier utilisé 
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name.split('.')[0] + '_' + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image'); //fichier unique et non pas grupe de fichier 