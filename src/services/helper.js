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
    
            let resp = "\n``` json\n"
            resp += JSON.stringify(r.data)
            resp += "\n```\n"
    
            IN_MEMORY_DB.add_post_info(ctx.post_id, {
                job_id: r.data.request,
                finished,
                error
            })
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
    },
    isValidEmail: (value, callback) => {
        const isEmail = String(value).toLowerCase().match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        const isValidEmail = String(value).endsWith('.gouv.fr')
        const resp = isEmail && isValidEmail
        if (!resp) {
            callback(`L'email n'est pas valide. Email en .gouv.fr uniquement.`)
        }
        return resp
    },
    isValidRegion: (value, callback) => {
        const resp = ['osc-fr1', 'osc-secnum-fr1'].includes(value)
        if (!resp) {
            callback(`La région n'est pas valide. Valeur acceptée osc-fr1 ou osc-secnum-fr1.`)
        }
        return resp
    },
    isValidUrl: (value, call) => {
        value = String(value)
        const isUrl = /^(http(s):\/\/.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(value)
        const isValidUrl = value.endsWith('.gouv.fr') || value.endsWith('.gouv.fr/')
        const resp = isUrl && isValidUrl
        if (!resp) {
            callback(`L'url n'est pas valide. Url requise finissant par .gouv.fr`)
        }
        return resp
    }
}
