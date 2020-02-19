//Connetion bdd mongoclient
var mongoose = require('mongoose');
const IDURL=require("../models/shemas");


var controller = {};


mongoose.connect("mongodb+srv://oceane08:password974@cluster0-owldh.mongodb.net/articles?retryWrites=true&w=majority", 
{useNewUrlParser: true},() =>

console.log("BDD CONNECTER")
);

//Chemain vers liste articles

    controller.index = (req, res) => {
        //Chemain vers l'affichage du formulaires

        IDURL.find(function(err, articles){

    console.log(articles);

        res.render('index.ejs',{articles:articles});

    });

    
    };
  
    controller.redirect = (req, res) => {

      IDURL.findById(req.params.id, function (err, articles) {

        console.log(articles);
   
        res.redirect(articles.url);    
  
    });
        
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

//Important pour export
module.exports = controller;
