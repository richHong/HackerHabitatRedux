import React from 'react';
class ContactForm extends React.Component {
	render(){
		return (
			<form>
				<label>Your Message:</label><br />
				<textarea ref={(message) => this.message = message} onChange={this.onMessage.bind(this)} rows='40' cols='150'></textarea><br/>
				<input name='message' type='submit' to="/createProfile" value='Send'/>
			</form>
		)
	}

}

export default ContactForm
