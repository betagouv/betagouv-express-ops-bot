require('dotenv').config();

module.exports = {
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
		'Authorization': 'Bearer ' + process.env.BETAOPSBOT_API_KEY
	},
	endpoint: process.env.BETAOPSBOT_API_ENDPOINT,
	airtable_endpoint: process.env.BETAOPSBOT_ALWAYSDATA_WEBHOOK,
	BOT_ENDPOINT: process.env.BOT_ENDPOINT,
	AIRTABLE_INTERRACTIVE_TOKEN: process.env.AIRTABLE_INTERRACTIVE_TOKEN,
	MATTERMOST_URL: process.env.MATTERMOST_URL
}
