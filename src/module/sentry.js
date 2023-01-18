
const { setTimeout } = require("timers/promises");
const config = require('./config')

async function sentry_member(email, team_name) {
    /* Ajout d un membre dans une team sur sentry: [email] [team]*/

    console.log('Sentry member')
    frm = mess.frm

    ask = "sentry member {email} {team}"
    api_endpoint = `${config.endpoint}/api/sentry/member`

    try {
        const r = await axios.post(api_endpoint, {
            email,
            team_name,
        },  config.headers)

        resp = "\n``` json\n"
        resp += JSON.stringify(r.data)
        resp += "\n```\n"

        if ([200, 201].includes(r.status)) {
            console.log(
                "`betaservices sentry member` reponse incorrecte: {}")
            return `:confused: Oups, réponse incorrecte: json request [${r.status}] ${resp}`
        } else {
            return "Ta demande est en cours de réalisation: `{ask}` : [{r.status_code}] {resp}"
        }
    } catch(e) {
        console.log("`betaservices sentry member` connectionerror: " + e)
        return `:confused: Oups, une erreur s'est produite`
    }
}

async function response_sentry_member() {
    console.log('Response sentry member')
    const cmdParams = req.body.text.split(' ').map(param => param.trim())
    await setTimeout(10000);
    const job_info = "finished"
    if (job_info == "finished") {
        const text = `Sentry: ajout de l utilisateur ${email} à la team ${team} :white_check_mark:`
        return text
    }
}

module.exports = {
    sentry_member,
    response_sentry_member
}
