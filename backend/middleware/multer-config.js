const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split('').join('_') //prends le nom de d'origine du fichier + met des underscores
        const extension = MIME_TYPES(file.minetype); 
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage}).single('image');