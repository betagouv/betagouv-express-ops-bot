const axios = require('axios')
const config = require('config')

module.exports = {
    setStatus: async function(recordId, status) {
        const api_endpoint = config.airtable_endpoint
        const params = {
            "recordId": recordId,
            "status": status
        }
        return await axios
            .post(api_endpoint, params)
            .catch(e => e.response)
    } 
}
