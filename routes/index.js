const router = require('express').Router();

const indexController = require('../controllers/indexController')




//Racine du projet + formulaire
router.get('/',indexController.index);
//Ajout 
router.post('/add', indexController.save);

//Route pagination
router.get('/page',indexController.pagination);

//Qrcode
router.get('/qrcode/:item',indexController.qrcode);


//action redirect id localhost:3000/id_url
//router.get('/item/:id', indexController.redirect);

module.exports = router;