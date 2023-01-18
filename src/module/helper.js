const axios = require('axios')
const config = require('../config')

module.exports = {
    getJobInfo: async function(job_id) {
        let api_endpoint = `${config.endpoint}/api/queue/jobs`
        if (job_id) {
            api_endpoint += `/${job_id}`
        }

        try {
            const r = await axios.post(api_endpoint, {},  { headers: config.headers }).catch(e => e.response)
            return r.data   
        } catch(e) {
            throw new Error(e)
        }
    }
}
