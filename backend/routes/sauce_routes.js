const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces_controller');
const sauce = require('../routes/sauce_routes');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//auth permet de devoir etre connecté pour agir avec un élément 
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.postOneSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.putOneSauce);
router.delete('/:id', auth, sauceCtrl.deleteOneSauce);
router.post('/:id/like', auth, sauceCtrl.likeOrDislikeOneSauce);


module.exports = router;

