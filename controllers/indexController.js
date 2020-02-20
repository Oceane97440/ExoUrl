//Connetion bdd mongoclient
var mongoose = require('mongoose');
const IDURL=require("../models/shemas");


var controller = {};


mongoose.connect("mongodb+srv://oceane08:password974@cluster0-owldh.mongodb.net/articles?retryWrites=true&w=majority", 
{useNewUrlParser: true},() =>

console.log("BDD CONNECTER")
);


controller.index = (req, res) => {
        //Chemain vers l'affichage du formulaires

       res.render('index.ejs');

    };







//Chemain vers liste articles
    controller.pagination = async (req, res,next) => {
      var perPage = 5
      var page = req.params.page || 1
    
      IDURL
          .find({})
          .skip((perPage * page) - perPage)
          .limit(perPage)
          .exec(function(err, products) {
            IDURL.count().exec(function(err, count) {
                  if (err) return next(err)
                  res.render('pagination.ejs', {
                    products: products,
                      current: page,
                      pages: Math.ceil(count / perPage)
                  })
              })
          })
       
    };
 


//Sauvegarde les données
controller.save = (req, res) => {
   
      var articles = new IDURL({
  
        url :req.body.url,
       
      });
      console.log(articles);

      articles.save(function(err){
          if(err){
            res.send(err);
          }
          
          return res.redirect('/'); 
  
      })
  };
 
  controller.redirect = (req, res) => {

    IDURL.findById(req.params.id, function (err, articles) {

      console.log(articles);
 
      res.redirect(articles.url);    

  });
      
  };
  
//Important pour export
module.exports = controller;
