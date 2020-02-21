const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const paginate = require('express-paginate');




const app = express();

app.use(paginate.middleware(4, 50));

//ressources public
app.use(express.static(path.join(__dirname, 'public')));

//ressources node_modules
app.use('/scripts', express.static(path.join(__dirname, '/node_modules/qrcode/build/')));

//Indique qu'on utilise express ejs
app.set('views', __dirname + '/views');
app.set('views engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))

//Chemain vers index.js
const index = require('./routes/index');
app.use('/', index)





app.listen(3000, () => {

});