const helper = require('../services/helper')
// const IN_MEMORY_DB = require('../services/inmemory').IN_MEMORY_DB

async function jobs(ctx, job_id) {
    try {
        const r = helper.getJobInfo(job_id)

        resp = "\n``` json\n"
        resp += JSON.stringify(r.data)
        resp += "\n```\n"

        if (![200, 201].includes(r.status)) {
            console.log(
                `betaservices jobs reponse incorrecte: {}`)
            return `:confused: Oups, réponse incorrecte: json request [${r.status}] ${resp}`
        } else {
            return `Ta demande est en cours de réalisation: ${resp}`
        }
    } catch(e) {
        console.log(`betaservices jobs connectionerror: ` + e)
        return `:confused: Oups, une erreur s'est produite`
    }
}

module.exports = {
    jobs
}
