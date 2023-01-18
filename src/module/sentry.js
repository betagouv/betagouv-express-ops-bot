const axios = require('axios')
const { setTimeout } = require("timers/promises");
const config = require('../config')
const helper = require('./helper')
const IN_MEMORY_DB = require('./inmemory').IN_MEMORY_DB

// team_domain,
// channel_id,
// channel_name,
// timestamp
// user_id,
// team_id,
// user_name,
// text,
// trigger_word,
// file_ids
// post_id,
// token

async function sentry_member(ctx, email, team_name) {
    /* Ajout d un membre dans une team sur sentry: [email] [team]*/

    console.log('Sentry member')

    const api_endpoint = `${config.endpoint}/api/sentry/member`

    try {
        const params = {
            email,
            team_name,
        }
        const r = await axios
            .post(api_endpoint, params, {
                headers:config.headers
            })
            .catch(e => e.response )

        resp = "\n``` json\n"
        resp += JSON.stringify(r.data)
        resp += "\n```\n"

        if ([200, 201].includes(r.status)) {
            console.log(
                "`betaservices sentry member` reponse incorrecte: {}")
            return `:confused: Oups, réponse incorrecte: json request [${r.status}] ${resp}`
        } else {
            IN_MEMORY_DB[ctx.post_id] = r.data.request
            return `Ta demande est en cours de réalisation: ${resp}`
        }
    } catch(e) {
        console.log("`betaservices sentry member` connectionerror: " + e)
        return `:confused: Oups, une erreur s'est produite`
    }
}

async function response_sentry_member(ctx, email, team_name) {
    console.log('Response sentry member')
    await setTimeout(10000);
    const job_info = "finished"
    if (job_info == "finished") {
        const text = `Sentry: ajout de l utilisateur ${email} à la team ${team_name} :white_check_mark: ${IN_MEMORY_DB[ctx.post_id]}`
        return text
    }
}

module.exports = {
    sentry_member,
    response_sentry_member
}
