const router = require('express').Router();

const indexController = require('../controllers/indexController')




//Racine du projet
router.get('/',indexController.index);

//Ajout 
router.post('/add', indexController.save);

module.exports = router;