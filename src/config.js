const config = require('dotenv');

config();

module.exports = {
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': 'Bearer ' + process.env.BETAOPSBOT_API_KEY
	},
	endpoint: process.env.BETAOPSBOT_API_ENDPOINT
}
