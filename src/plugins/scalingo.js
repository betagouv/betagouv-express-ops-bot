const helper = require('../services/helper')
const config = require('../config')

async function scalingoapp(ctx, name, region, collaborator) {
    const params = {
        name,
        region,
        collaborator
    }
    const errors = {}
    helper.isValidEmail(collaborator, (error) => { errors['app_collaborator'] = error })
    helper.isValidRegion(region, (error) => { errors['app_region'] = error })
    if (errors.length) {
        return `Erreur de params : ${JSON.stringify(errors)}`
    }
    const api_endpoint = `/api/scalingo/apps`
    console.log(params)
    return helper.call(ctx, api_endpoint,
        params,
        {
            finished: `Scalingo: creation de l'app ${name}, ${region}, with ${collaborator} :white_check_mark:`,
            error: `Scalingo: la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

module.exports = {
    scalingoapp
}
