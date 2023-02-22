const config = require('../config')
const helper = require('../services/helper')

async function updown_check(ctx, url, recipient) {
    let api_endpoint = `/api/updown/check`
    if (recipient) {
        api_endpoint = '/api/updown/create-and-set-recipient'
    }
    const params = {
        url,
        recipient
    }
    const errors = {}
    helper.isValidUrl(url, (error) => {errors['url'] = error})
    if (Object.keys(errors).length) {
        return `Erreur de params : ${JSON.stringify(errors)}`
    }

    return helper.call(ctx, api_endpoint,
        params,
        {
            finished: `Updown: ajout de l'url ${url} :white_check_mark:`,
            error: `Updown : la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

async function updown_enable(ctx, url) {
    const api_endpoint = `/api/updown/check/enable`
    const params = {
        url
    }
    const errors = {}
    helper.isValidUrl(url, (error) => {errors['url'] = error })
    if (Object.keys(errors).length) {
        return `Erreur de params : ${JSON.stringify(errors)}`
    }

    return helper.call(ctx, api_endpoint,
        params,
        {
            finished: `Updown: enable check sur l'url ${url} :white_check_mark:`,
            error: `Updown : la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

async function updown_disable(ctx, url) {
    const api_endpoint = `/api/updown/check/disable`
    const params = {
        url
    }
    const errors = {}
    helper.isValidUrl(url, (error) => {errors['url'] = error })
    if (Object.keys(errors).length) {
        return `Erreur de params : ${JSON.stringify(errors)}`
    }

    return helper.call(ctx, api_endpoint,
        params,
        {
            finished: `Updown: disable check de l'url ${url} :white_check_mark:`,
            error: `Updown : la tâche ${ctx.post_id} n'est pas fini après 10s, il doit y avoir une erreur`
        }
    )
}

async function updown_delete(ctx, url) {
    const api_endpoint = `/api/updown/check/delete`
    const params = {
        url
    }
    const errors = {}
    helper.isValidUrl(url, (error) => {errors['url'] = error })
    if (Object.keys(errors).length) {
        return `Erreur de params : ${JSON.stringify(errors)}`
    }

    return helper.call(ctx, api_endpoint,
        params,
        {
            finished: `Updown: suppresion du site ${url} :white_check_mark:`,
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
