//Connetion bdd mongoclient
const mongoose = require('mongoose');
const IDURL=require("../models/shemas");
const QRCode = require('qrcode');

var controller = {};


mongoose.connect("mongodb+srv://oceane08:password974@cluster0-owldh.mongodb.net/articles?retryWrites=true&w=majority", 
{useNewUrlParser: true},() =>

console.log("BDD CONNECTER")
);

 //Chemain vers l'affichage du formulaires
controller.index = (req, res) => {
       

  res.render('index.ejs');
};


//Chemain vers liste url et la pagination
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
 
controller.qrcode= (req, res, next) => {


  IDURL.findById(req.params.item, (err, url) => {

  QRCode.toDataURL(url.url, function (err, qrcode) {
    console.log(qrcode);

    res.render('qrcode.ejs',{qrcode});
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
 
  //Redirect pour 1 id
  controller.redirect = (req, res) => {

    IDURL.findById(req.params.id, function (err, articles) {

      console.log(articles);
 
      res.redirect(articles.url);    

  });
      
  };
  


//Important pour export
module.exports = controller;
