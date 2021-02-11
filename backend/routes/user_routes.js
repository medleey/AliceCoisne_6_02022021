const express = require('express');
const router = express.Router(); 
const userCtrl = require('../controllers/user_ctrl');

router.post('/signup', function(req, res){
    userCtrl.singup
  });
router.post('/login', userCtrl.login);

module.exports= router; 
