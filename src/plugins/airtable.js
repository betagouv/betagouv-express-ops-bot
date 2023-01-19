const config = require('../config')
const axios = require('axios')

async function airtable(ctx, recordId, status) {

    const api_endpoint = config.airtable_endpoint
    const params = {
        "recordId": recordId,
        "status": status || "Fini"
    }
    try {
        const r = await axios
        .post(api_endpoint, params)
        .catch(e => e.response )

        const resp = "\n``` json\n"
        resp += JSON.stringify(r.data)
        resp += "\n```\n"
        return resp
    } catch (e) {
        return 'Error'
        console.log(e)
    }
}

module.exports = {
    airtable
}
