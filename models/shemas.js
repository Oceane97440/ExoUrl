//Importation du module mongoose
const mongoose = require("mongoose");

//Créaction du schema

const IDURL =  mongoose.Schema({
    
  url: { type: String, required: true },
    

  });

  

  module.exports = mongoose.model("test", IDURL);
  //Nom de la collection > articles