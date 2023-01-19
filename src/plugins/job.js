const helper = require('../services/helper')

async function jobs(ctx, job_id) {
    try {
        const r = await helper.getJobInfo(job_id)
        let resp = "\n``` json\n"
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
