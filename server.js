// server.js
// set up ======================================================================
// get all the tools we need
var express  = require('express');
var mongodb  = require('mongodb');
var app      = express();
var MongoClient = require('mongodb').MongoClient;
var db;
var port     = process.env.PORT || 8080;

// configuration ===============================================================
MongoClient.connect("mongodb://naoufal:naoufal@ds019980.mlab.com:19980/naoufal", function(err, database)
{
if(err) throw err;
db = database;
app.listen(port, function ()
{
console.log('Example app listening on port' + port);
});
});
app.get('/', function (req, res) {
res.json({ message: 'welcome api!' });
});
app.get('/allannonces', function (req, res)
{
db.collection("annonces").find().toArray(function(err, users) {
res.send(users);
});
});
/*---------------------------------------------------------------------------*/

var bodyParser = require('body-parser');
app.use(bodyParser.json() ); //to support JSON encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); //to support URL encoded bodies

//ajouter un utilisateur
app.post('/addannonces', function(req, res){
	db.collection('annonces').insertOne(
		{
			"Type" : req.body['Type'],
			"Titre" : req.body['Titre'],
			"Categorie" : req.body['Categorie'],
			"Localisation" : req.body['Localisation'],
			"Description" : req.body['Description']
		}, function(err, result) {
									res.json({ message: 'your advertisement has been added' });
		});
});

//modifier un utilisateur
app.post('/editannonces', function(req, res){
	db.collection('annonces').updateOne(
		{ "Titre" : req.body['Titre'] },
	{
		$set: { 
				"Type" : req.body['Type'],
				"Categorie": req.body['Categorie'],
				"Localisation": req.body['Localisation'],
				"Description": req.body['Description']
			  }

	},  function(err, results){
		res.json({ message: 'user: '+req.body['name']+' changed to: '+req.body['email']});
	});
});

//suprimer un utilisateur
app.post('/deleteUsername', function(req, res){
	db.collection('annonces').updateOne(
		{ "name" : req.body['name'] },
		function(err, results){
		res.json({ message: 'annonces: '+req.body['name']+' deleted '});
	}
	);
});
