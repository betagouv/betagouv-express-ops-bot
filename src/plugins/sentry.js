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
    const errors = {}
    helper.isValidEmail(email, (error) => {errors['email'] = error })
    if (Object.keys(errors).length) {
        return `Erreur de params : ${JSON.stringify(errors)}`
    }

    const api_endpoint = `/api/sentry/team`
    return helper.call(ctx, api_endpoint,
        params,
        {
            finished: `Sentry: ajout de l utilisateur ${email} à la team ${team_name} :white_check_mark:`,
            error: `Sentry : la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

async function sentry_project(ctx, project_name, team_name) {
    const api_endpoint = `/api/sentry/project`
    const params = {
        project_name,
        team_name
    }
    return helper.call(ctx, api_endpoint,
        params,
        {
            finished: `Sentry: ajout du projet ${project_name} à la team ${team_name} :white_check_mark:`,
            error: `Sentry : la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

async function sentry_member(ctx, email, team_name) {
    /* Ajout d un membre dans une team sur sentry: [email] [team]*/

    const api_endpoint = `/api/sentry/member`
    const params = {
        project_name,
        team_name
    }
    return helper.call(ctx, api_endpoint,
        params,
        {
            finished: `Sentry: ajout de l utilisateur ${email} à la team ${team_name} :white_check_mark:`,
            error: `Sentry : la tâche ${ctx.post_id} n'est pas fini après 10s il doit y avoir une erreu`
        }
    )
}

module.exports = {
    sentry_member,
    sentry_team,
    sentry_project,
    // response_sentry_member
}
