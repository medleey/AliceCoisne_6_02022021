const uuid = require('uuid/v1');
const Sauce = require('../models/Sauce_model');

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then( //prend le Sauces_model et fait un .find (va cherhcer toutes les données dans le model) .then (qd il a tout récup, il passe à la suite)
    (sauces) => { // récupère toutes les sauces et pour chacune d'entre elle il va faire qqlchse
      //const mappedTeddies = teddies.map((teddy) => {
      //teddy.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + teddy.imageUrl;
      //return teddy;
      //});
      res.status(200).json(sauces); // res=réponse 200=ok à mettre sous forme json ttes les sauces récupérées 
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!')); // si ça se passe mal, ça tombe dans le .catch, permet de faire des traitements si il y a eu des pb 
    }
  );
};

exports.getOneTeddy = (req, res, next) => {
  Teddy.findById(req.params.id).then(
    (teddy) => {
      if (!teddy) {
        return res.status(404).send(new Error('Teddy not found!'));
      }
      teddy.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + teddy.imageUrl;
      res.status(200).json(teddy);
    }
  ).catch(
    () => {
      res.status(500).send(new Error('Database error!'));
    }
  )
};

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
exports.orderTeddies = (req, res, next) => {
  if (!req.body.contact ||
    !req.body.contact.firstName ||
    !req.body.contact.lastName ||
    !req.body.contact.address ||
    !req.body.contact.city ||
    !req.body.contact.email ||
    !req.body.products) {
    return res.status(400).send(new Error('Bad request!'));
  }
  let queries = [];
  for (let productId of req.body.products) {
    const queryPromise = new Promise((resolve, reject) => {
      Teddy.findById(productId).then(
        (teddy) => {
          if (!teddy) {
            reject('Camera not found: ' + productId);
          }
          teddy.imageUrl = req.protocol + '://' + req.get('host') + '/images/' + teddy.imageUrl;
          resolve(teddy);
        }
      ).catch(
        () => {
          reject('Database error!');
        }
      )
    });
    queries.push(queryPromise);
  }
  Promise.all(queries).then(
    (teddies) => {
      const orderId = uuid();
      return res.status(201).json({
        contact: req.body.contact,
        products: teddies,
        orderId: orderId
      })
    }
  ).catch(
    (error) => {
      return res.status(500).json(new Error(error));
    }
  );
};
