var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/contactlist";

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		db.collection("user").find({}).toArray(function(err, result) {
		    if (err) throw err;
	    	res.json(result);
	  	});
	});
});

app.post('/contactlist', function(req, res){
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
	  	db.collection("user").insertOne(req.body, function(err, result) {
	    	if (err) throw err;
	    	res.json(result);
	 	});
	});
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
	  	db.collection("user").deleteOne({_id: ObjectID(id)}, function(err, result) {
	    	if (err) throw err;
	    	res.json(result);
	 	});
	});
});

app.get('/contactlist/:id', function(req, res){
	var id = req.params.id;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
	  	db.collection("user").findOne({_id: ObjectID(id)}, function(err, result) {
	    	if (err) throw err;
	    	res.json(result);
	 	});
	});
});

app.put('/contactlist/:id', function(req, res){
	var id = req.params.id;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var myquery = { _id: ObjectID(id) };
		var newvalues = { name: req.body.name, email: req.body.email, number: req.body.number };
		db.collection("user").updateOne(myquery, newvalues, function(err, result) {
			if (err) throw err;
			res.json(result);
	  	});
	});
});

app.listen(3000);
console.log('Server running on port 3000.....');