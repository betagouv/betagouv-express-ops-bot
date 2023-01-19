// const axios = require('axios')
const config = require('../config')
const helper = require('../services/helper')
// const IN_MEMORY_DB = require('../services/inmemory').IN_MEMORY_DB

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

async function sentry_team(ctx, team_name, email) {
    console.log('Sentry team')
    const params = {
        team_name,
        email
    }
    const api_endpoint = `${config.endpoint}/api/sentry/team`
    helper.call(api_endpoint,
        params,
        {
            finished: `Sentry: ajout de l utilisateur ${email} à la team ${team_name} :white_check_mark:`,
            error: `Sentry : la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

async function sentry_project(ctx, project_name, team_name) {
    const api_endpoint = `${config.endpoint}/api/sentry/project`
    const params = {
        project_name,
        team_name
    }
    helper.call(api_endpoint,
        params,
        {
            finished: `Sentry: ajout du projet ${project_name} à la team ${team_name} :white_check_mark:`,
            error: `Sentry : la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

async function sentry_member(ctx, email, team_name) {
    /* Ajout d un membre dans une team sur sentry: [email] [team]*/

    const api_endpoint = `${config.endpoint}/api/sentry/member`
    const params = {
        project_name,
        team_name
    }
    helper.call(api_endpoint,
        params,
        {
            finished: `Sentry: ajout de l utilisateur ${email} à la team ${team_name} :white_check_mark:`,
            error: `Sentry : la tâche ${ctx.post_id} n'est pas fini après 10s il doit y avoir une erreu`
        }
    )

    // console.log('Sentry member')

    // const api_endpoint = `/api/sentry/member`

    // try {
    //     const params = {
    //         email,
    //         team_name,
    //     }
    //     const r = await axios
    //         .post(api_endpoint, params, {
    //             headers:config.headers
    //         })
    //         .catch(e => e.response )

    //     resp = "\n``` json\n"
    //     resp += JSON.stringify(r.data)
    //     resp += "\n```\n"

    //     IN_MEMORY_DB[ctx.post_id] = {
    //         job_id: r.data.request,
    //         name: 'sentry_member',
    //         finished: `Sentry: ajout de l utilisateur ${email} à la team ${team_name} :white_check_mark:`,
    //         error: `Sentry : la tâche ${ctx.post_id} n'est pas fini après 10s il doit y avoir une erreur`
    //     }

    //     if (![200, 201].includes(r.status)) {
    //         console.log(
    //             "`betaservices sentry member` reponse incorrecte: {}")
    //         return `:confused: Oups, réponse incorrecte: json request [${r.status}] ${resp}`
    //     } else {
    //         return `Ta demande est en cours de réalisation: ${resp}`
    //     }
    // } catch(e) {
    //     console.log("`betaservices sentry member` connectionerror: " + e)
    //     return `:confused: Oups, une erreur s'est produite`
    // }
}

// async function response_sentry_member(ctx, email, team_name) {
//     await setTimeout(10000);
//     if (IN_MEMORY_DB[ctx.post_id]) {
//         const job = await helper.getJobInfo(IN_MEMORY_DB[ctx.post_id])
//         console.log('LCS JOB RESPONSE', job)
//         let text
//         if (job.status === 'finished') {
//             text = `Sentry: ajout de l utilisateur ${email} à la team ${team_name} :white_check_mark: ${IN_MEMORY_DB[ctx.post_id]}`
//         } else {
//             text = `Sentry : la tâche ${IN_MEMORY_DB[ctx.post_id]} n'est pas fini après 10s il doit y avoir une erreur`
//         }
//         return text
//     }
// }

module.exports = {
    sentry_member,
    sentry_team,
    sentry_project,
    // response_sentry_member
}
