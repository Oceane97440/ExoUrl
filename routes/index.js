const router = require('express').Router();

const indexController = require('../controllers/indexController')




//Racine du projet + formulaire
router.get('/',indexController.index);




//Route pagination
router.get('/:page',indexController.pagination);

//Ajout 
router.post('/add', indexController.save);

//action redirect id localhost:3000/id_url
router.get('/:id', indexController.redirect);

module.exports = router;