var React = require('react');
var Helpers = require('../utils/helpers');
var Contact = require('../Components/Contact');

var HomeContainer = React.createClass({
	getInitialState: function () {
		return {
			isLoading: true,
			contacts: []
		}
	},

	componentDidMount: function () {
		var query = this.props.location.query;
		Helpers.getContacts().then(function(contacts) {
			this.setState({
				isLoading: false,
				contacts: contacts
			});
		}.bind(this))
	},

	render: function () {
		return (
			<div>
				<Contact 
				contacts={this.state.contacts}
				isLoading={this.state.isLoading}
				/>
			</div>
		)
	}
});

module.exports = HomeContainer;