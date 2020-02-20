const router = require('express').Router();

const indexController = require('../controllers/indexController')




//Racine du projet + formulaire
router.get('/',indexController.index);


//action redirect id localhost:3000/id_url
router.get('/:id', indexController.redirect);

//Route pagination
router.get('/:page',indexController.pagination);

//Ajout 
router.post('/add', indexController.save);



module.exports = router;