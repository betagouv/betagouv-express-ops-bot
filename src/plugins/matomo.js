const helper = require('../services/helper')
const config = require('../config')

async function matomo_site(ctx, url, email) {
    const params = {
        url,
        email
    }
    const errors = {}
    helper.isValidEmail(email, (error) => {errors['email'].push(error)})
    helper.isValidUrl(url, (error) => {errors['url'].push(error)})
    if (Object.keys(errors).length) {
        return `Erreur de params : ${JSON.stringify(errors)}`
    }

    const api_endpoint = `/api/matomo/site`
    return helper.call(ctx, api_endpoint,
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
    const errors = {}
    helper.isValidEmail(email, (error) => {errors['email'].push(error)})
    helper.isValidUrl(url, (error) => {errors['url'].push(error)})
    if (Object.keys(errors).length) {
        return `Erreur de params : ${JSON.stringify(errors)}`
    }
    const api_endpoint = `/api/matomo/user`
    return helper.call(ctx, api_endpoint,
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
