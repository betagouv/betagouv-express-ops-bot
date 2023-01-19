const helper = require('../services/helper')

async function jobs(ctx, job_id) {
    try {
        const r = helper.getJobInfo(job_id)
        console.log('jobs', r)
        const resp = "\n``` json\n"
        resp += JSON.stringify(r)
        resp += "\n```\n"

        return `Result: ${resp}`
    } catch(e) {
        console.log(`betaservices jobs connectionerror: ` + e)
        return `:confused: Oups, une erreur s'est produite`
    }
}

module.exports = {
    jobs
}
