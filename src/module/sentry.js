
const { setTimeout } = require("timers/promises");

async function sentry_member(req, res) {
    const cmdParams = cmd.replace(arguments.callee.name, '').split(' ').map(param => param.trim())
    await setTimeout(5000);
    res.json({
        text: 'sentry response',
        response_type: 'comment',
    })
}

module.exports = {
    sentry_member
}
