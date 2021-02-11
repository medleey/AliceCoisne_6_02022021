const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce_ctrl');
const sauce = require('../routes/sauce_routes');
const auth = require('../middleware/auth');
//const multer = require('../middleware/multer-config');


router.get('/', sauceCtrl.getAllSauces); //auth permet de devoir etre connecté pour agir avec un élément 
router.post('/', sauceCtrl.postOneSauce);
router.get('/:id', sauceCtrl.getOneSauce);
router.put('/:id', sauceCtrl.putOneSauce);
router.delete('/:id', sauceCtrl.deleteOneSauce);
//router.post('/:id/like', sauceCtrl.likeOneSauce);


module.exports = router;