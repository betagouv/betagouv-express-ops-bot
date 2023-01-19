const helper = require('../services/helper')

async function jobs(ctx, job_id) {
    try {
        const r = helper.getJobInfo(job_id)

        resp = "\n``` json\n"
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

module.exports = {
    jobs
}
