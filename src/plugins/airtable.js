const config = require('../config')
const airtablelib = require('../lib/airtable')

async function airtable(ctx, recordId, status) {
    try {
        const r = await airtablelib.setStatus(recordId, status || "Fini")

        let resp = "\n``` json\n"
        resp += JSON.stringify(r.data)
        resp += "\n```\n"
        return resp
    } catch (e) {
        console.log(e)
        return 'Error'
    }
}

module.exports = {
    airtable
}
