var React = require('react');

function Contact(props) {
	var contactItems = function() {
		if (props.isLoading === false) {
			return props.contacts.map(function(value) {
				return (
					<div>
						{value.name}
						{value.phone}
					</div>
				)
			});
		}
	}

	return (
		props.isLoading === true ?
		<p>Loading</p>
		:
		<div>
			{contactItems}
		</div>
	)
}

module.exports = Contact;