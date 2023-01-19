const config = require('../config')
const helper = require('../services/helper')

async function updown_check(ctx, project_name, team_name) {
    const api_endpoint = `/api/updown/check`
    const params = {
        project_name,
        team_name
    }
    helper.call(api_endpoint,
        params,
        {
            finished: `Updown: ajout du projet ${project_name} à la team ${team_name} :white_check_mark:`,
            error: `Updown : la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

async function updown_enable(ctx, project_name, team_name) {
    const api_endpoint = `/api/updown/check/enable`
    const params = {
        project_name,
        team_name
    }
    helper.call(api_endpoint,
        params,
        {
            finished: `Updown: ajout du projet ${project_name} à la team ${team_name} :white_check_mark:`,
            error: `Updown : la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

async function updown_disable(ctx, project_name, team_name) {
    const api_endpoint = `/api/updown/check/disable`
    const params = {
        project_name,
        team_name
    }
    helper.call(api_endpoint,
        params,
        {
            finished: `Updown: ajout du projet ${project_name} à la team ${team_name} :white_check_mark:`,
            error: `Updown : la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

async function updown_delete(ctx, project_name, team_name) {
    const api_endpoint = `/api/updown/check/delete`
    const params = {
        project_name,
        team_name
    }
    helper.call(api_endpoint,
        params,
        {
            finished: `Updown: ajout du projet ${project_name} à la team ${team_name} :white_check_mark:`,
            error: `Updown : la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

module.exports = {
    updown_check,
    updown_delete,
    updown_enable,
    updown_disable
}
