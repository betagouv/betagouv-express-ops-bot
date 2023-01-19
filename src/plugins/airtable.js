const helper = require('../services/helper')
const config = require('../config')

async function airtable(ctx, app_name, app_region, app_collaborator) {
    const params = {
        app_name,
        app_region,
        app_collaborator
    }
    const api_endpoint = config.airtable_endpoint
    helper.call(api_endpoint,
        params,
        {
            // finished: `Scalingo: creation de l'app ${app_name}, ${app_region}, with ${app_collaborator} :white_check_mark:`,
            // error: `Scalingo: la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

module.exports = {
    airtable
}