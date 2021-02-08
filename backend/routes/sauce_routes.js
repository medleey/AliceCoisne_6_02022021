const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce_ctrl');
const sauce = require('../routes/sauce_routes');


router.get('/', sauceCtrl.getAllSauces);
router.post('/', sauceCtrl.postOneSauce);
router.get('/:id', sauceCtrl.getOneSauce);
router.put('/:id', sauceCtrl.putOneSauce);
router.delete('/:id', sauceCtrl.deleteOneSauce);
router.post('/:id/like', sauceCtrl.likeOneSauce);


module.exports = router;