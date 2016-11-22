var axios = require('axios');

var helpers = {
	getallContacts: function () {
		return axios.get('http://localhost:3000/api/users')
		.then(function (contacts) {
			return contacts.data;
		}).catch(function (err) {
			console.warn(err);
		})
	},

	getContacts: function (search) {
		return axios.get('http://localhost:3000/api/user/' + search)
		.then(function (contacts) {
			return contacts.data;
		}).catch(function (err) {
			console.warn(err);
		})
	}
};

module.exports = helpers;