const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce_ctrl');

router.get('/', sauceCtrl.getAllSauces);
//router.post('/', sauceCtrl.postOneSauce);
//router.get('/:id', teddyCtrl.getOneTeddy);
//router.post('/order', teddyCtrl.orderTeddies);

module.exports = router;