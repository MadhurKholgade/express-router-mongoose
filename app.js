const express = require("express");
var app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var routes = require('./routes/app-routes.js');

app.use('/app', routes);

var port = 1234;
app.listen(port, function(){
    console.log("App listening on port "+port);
});