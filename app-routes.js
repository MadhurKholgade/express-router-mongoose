var express = require('express');
var router = express.Router();
var app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Person = require('./../models/person.model');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//Start connection
var db = 'mongodb://localhost/example';
mongoose.connect(db);

router.get('/', function(req, res){
    res.send('Happy to be here..');
});

router.get('/persons', function(req, res){
    console.log("Getting all books..");
    Person.find().exec(function(err,persons){
        if(err) {
            res.send('An error has occured..');
        } else {
            console.log(persons);
            res.json(persons)
        }
    });
});

router.get("/persons/:id", (req, res) => {

    Person.findById(req.params.id).exec(function (err, person) {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log("Person with id "+ req.params.id + "is retrived.");
            res.send(person);
        }
    });
});

router.post("/persons", function(req, res)  {
    var newPerson = new Person({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });
    
    newPerson.save(function(err, person){
        if(err) {
            res.send('error in saving person');
        } else {
            console.log(person);
            res.send(person);
        }
    })

});

router.put("/persons/:id", (req, res) => {
    Person.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, person) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(req.body);
            console.log('Person udpated.');
        }
    });
});

router.delete("/persons/:id", (req, res) => {
    Person.deleteOne({ _id: req.params.id }).exec(function (err, person) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send(req.body);
            console.log('Person deleted.');
        }
    });
});


//export this router to use in our index.js
module.exports = router;