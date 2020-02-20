const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
//const paginate = require('express-paginate');




const app = express();

//app.use(paginate.middleware(5, 5));

app.use(express.static(path.join(__dirname, 'public')));
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