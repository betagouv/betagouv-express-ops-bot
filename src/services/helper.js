const axios = require('axios')
const config = require('../config')
const IN_MEMORY_DB = require('../services/inmemory').IN_MEMORY_DB

module.exports = {
    getJobInfo: async function(job_id) {
        let api_endpoint = `${config.endpoint}/queue/jobs`
        if (job_id) {
            api_endpoint += `/${job_id}`
        }

        try {
            const r = await axios.get(api_endpoint, { headers: config.headers }).catch(e => e.response)
            return r.data   
        } catch(e) {
            throw new Error(e)
        }
    },
    call: async function call(ctx, api, params, { finished, error }) {
        const api_endpoint = `${config.endpoint}${api}`
        try {
            const r = await axios
            .post(api_endpoint, params, {
                headers:config.headers
            })
            .catch(e => e.response )
    
            const resp = "\n``` json\n"
            resp += JSON.stringify(r.data)
            resp += "\n```\n"
    
            IN_MEMORY_DB[ctx.post_id] = {
                job_id: r.data.request,
                finished,
                error
            }
            if (![200, 201].includes(r.status)) {
                console.log(
                    `betaservices ${api} reponse incorrecte: {}`)
                return `:confused: Oups, réponse incorrecte: json request [${r.status}] ${resp}`
            } else {
                return `Ta demande est en cours de réalisation: ${resp}`
            }
        } catch(e) {
            console.log(`betaservices ${api} connectionerror: ` + e)
            return `:confused: Oups, une erreur s'est produite`
        }
    }
}
