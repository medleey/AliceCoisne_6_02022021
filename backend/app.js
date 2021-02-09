const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require('./routes/sauce_routes');
const userRoutes = require('./routes/user_routes');

mongoose.connect(
  'mongodb+srv://AliceCoisne_P6_OC:GrIw3e@cluster0.myt7k.mongodb.net/<dbname>?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

const app = express();

app.use((req, res, next) => { //cors 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

//mettre les actions dans sauce controller, remplacer app par export (export.put) - 
//tester les routes pour vérifier avec l'app en front end, 1er le crud (lire, modifer, supprimer) - créer le dossier User
//pour écrire sur BDD c'est SQL (mongoose s'en occupe, il le traduit)