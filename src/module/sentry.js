
const { setTimeout } = require("timers/promises");

async function sentry_member(req, res) {
    console.log('Sentry member')
    const cmdParams = req.body.text.split(' ').map(param => param.trim())
    await setTimeout(5000);
    res.json({
        text: 'sentry quest',
        response_type: 'comment',
    })
}

async function response_sentry_member(req, res) {
    console.log('Response sentry member')
    const cmdParams = req.body.text.split(' ').map(param => param.trim())
    await setTimeout(10000);
    res.json({
        text: 'sentry response',
        response_type: 'comment',
    })
}

module.exports = {
    sentry_member,
    response_sentry_member
}
