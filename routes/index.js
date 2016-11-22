var express = require('express');
var request = require('request');
var mongoose = require('mongoose');

var router = express.Router();
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/my-phone-book', function (err, db) {
	if(!err) {
		console.log('DB connected.');
	}
});

var phoneBookSchema = new Schema({
	name:  {
		type: String,
		required: true,
		unique: true
	},
	phone_number: {
		type: String,
		required: true,
		unique: true
	},
	address: {
		type: String,
		required: true,
	},
});

var PhoneBook = mongoose.model('PhoneBook', phoneBookSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/users', function (req, res) {
	request('http://www.mocky.io/v2/581335f71000004204abaf83', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var body = JSON.parse(body);
			var contacts = body.contacts;
			contacts.forEach(function(contact) {
				var newContact = new PhoneBook(contact);
				newContact.save();
			});
			PhoneBook.find({}, function(err, docs) {
				if (!err) {
					res.send(docs);
				}
			})
		}
	});
});

router.get('/api/user/:user', function (req, res) {
	PhoneBook.find({"name": new RegExp(req.params.user, 'i')}, function(err, docs) {
		if (!err) {
			res.send(docs);
		}
	});
});

module.exports = router;
