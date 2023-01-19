const helper = require('../services/helper')
const config = require('../config')

async function matomo_site(ctx, url, email) {
    const params = {
        url,
        email
    }
    const api_endpoint = `/api/matomo/site`
    helper.call(ctx, api_endpoint,
        params,
        {
            finished: `Matomo: création du site ${url} avec un administrateur ${email} et stats publiques :white_check_mark::`,
            error: `Matomo: la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

async function matomo_user(ctx, url, email) {
    const params = {
        url,
        email
    }
    const api_endpoint = `/api/matomo/user`
    helper.call(ctx, api_endpoint,
        params,
        {
            finished: `Matomo: ajout de l utilisateur ${email} avec le role access sur ${url} :white_check_mark:`,
            error: `Matomo: la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

module.exports = {
    matomo_site,
    matomo_user
}
