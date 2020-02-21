//Connetion bdd mongoclient
const mongoose = require('mongoose');
const IDURL=require("../models/shemas");
const QRCode = require('qrcode');
const paginate = require('express-paginate');


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
  
          try {
            const [results, itemCount] = await Promise.all([
              IDURL.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
              IDURL.countDocuments({})
            ]);
    
            const pageCount = Math.ceil(itemCount / req.query.limit);
          
            res.render('pagination.ejs', {
              products: results,
                pageCount,
                itemCount,
                pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
            })
        } catch (err) {
            next(err);
        }
};
 
controller.qrcode= (req, res, next) => {


  IDURL.findById(req.params.item, (err, url) => {

  QRCode.toDataURL(url.url, function (err, products) {
    console.log(products);

    res.render('qrcode.ejs',{products});
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
  // controller.redirect = (req, res) => {

  //   IDURL.findById(req.params.id, function (err, articles) {

  //     console.log(articles);
 
  //     res.redirect(articles.url);    

  // });
      
  // };
  


//Important pour export
module.exports = controller;
