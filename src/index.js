const express = require( "express" );
const { setTimeout } = require("timers/promises");
const axios = require('axios')

const helper = require('./services/helper')
const IN_MEMORY_DB = require('./services/inmemory').IN_MEMORY_DB
const sentry = require('./plugins/sentry')
const airtable = require('./plugins/airtable')
const matomo = require('./plugins/matomo')
const scalingo = require('./plugins/scalingo')
const updown = require('./plugins/updown')
const help = require('./plugins/help')
const job = require('./plugins/job')
const config = require('./config')
const airtablelib = require('./lib/airtable')
const TokenGenerator = require('./lib/tokenGenerator')
const app = express();
const port = process.env.PORT; // default port to listen
app.use(express.json())  
// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

const ENDPOINTS = [
    sentry.sentry_member,
    sentry.sentry_project,
    sentry.sentry_team,
    matomo.matomo_site,
    matomo.matomo_user,
    scalingo.scalingoapp,
    scalingo.scalingo_cms,
    updown.updown_check,
    updown.updown_delete,
    updown.updown_disable,
    updown.updown_enable,
    updown.updown_recipient,
    job.jobs,
    airtable.airtable,
    help.help
]
const ENDPOINTS_NAME = ENDPOINTS.map(endpoint => endpoint.name.split('_').join(' '))

async function response(ctx) {
    await setTimeout(10000)
    let params = ctx.text.split(' ')
    let chatMember = params.find(p => p.includes('chatmember='))
    let recordId = params.find(p => p.includes('recordid='))
    params = params.filter(p => !p.includes('chatmember=') && !p.includes('recordid='))
    const postInfo = IN_MEMORY_DB.get_post_info(ctx.post_id)
    if (postInfo) {
        const job = await helper.getJobInfo(postInfo.job_id)
        let text
        if (job.status === 'finished' && postInfo.finished) {
            text = postInfo.finished + ' ' + recordId
        } else if (postInfo.error) {
            text = postInfo.error + ' ' + recordId
        }
        return text
    }
}

app.post('/change-status-airtable', async(req, res) => {
    if (IN_MEMORY_DB.verify_callback_id(req.body.callback_id)) {
        const resp = await airtablelib.setStatus(req.body.submission.email, "Fini")
        console.log(`Set record ${req.body.submission.email} to finish`)
        return res.status(200).json({ 
            "update": {
                "message": "Updated!",
                props: {} // {} to removed attachement
            }
        })
    }
    res.status(200).json({})
})

app.post('/set-finished', async (req, res) => {
    if (req.body.context.token === config.AIRTABLE_INTERRACTIVE_TOKEN) {
        const callback_id = TokenGenerator.generateToken()
        IN_MEMORY_DB.add_callback_id(callback_id)
        await axios.post(config.MATTERMOST_URL, {
            trigger_id: req.body.trigger_id,
            url: config.BOT_ENDPOINT + '/change-status-airtable',
            dialog: {
                callback_id,
                title: "Hello",
                introduction_text: "Hello",
                elements: [{
                    "display_name": "Quel est le record id airtable",
                    "name": "email",
                    "type": "text",
                    "subtype:": "text",
                    "placeholder": "rec2319382131323"
                }],
                submit_label: "Ok",
                notify_on_cancel: false,
                state: "<string provided by the integration that will be echoed back with dialog submission>"
            }
        })
        if (req.body.context.recordId) {
            await airtablelib.setStatus(req.body.context.recordId, 'Fini')
            return res.json({
                "update": {
                  "message": "Updated!",
                  props: {} // {} to removed attachement
                }
            })
        }
        return res.json({
            // "ephemeral_text": "You updated the post!"
        })
        // return res.json({
        //     "update": {
        //       "message": "Une erreur c'est produit",
        //       props: {} // {} to removed attachement
        //     }
        // })
    }
})

app.post('/do-nothing', async (req, res) => {
    return res.json({
        "ephemeral_text": "You updated the post!"
    })
})

app.post("/check-question", async ( req, res ) => {
    console.log('Received post on main endpoint')
    if (!process.env.TOKEN.split(',').includes(req.body.token)) { 
        return
    }
    const cmd = `${req.body.text.replace('!betaservices', '').trim()}`.split(' ').map(c => c.trim()).join(' ')
    const endpointNames = ENDPOINTS_NAME.filter(endpointName => cmd.startsWith(endpointName))
    console.log("Endpoint quest :", endpointNames)
    if (endpointNames.length === 1) {
        const endpoint = ENDPOINTS.find(endpoint => endpoint.name.split('_').join(' ') === endpointNames[0])
        const endpointName = endpoint.name.split('_').join(' ')
        const params = cmd.replace(endpointName, '').trim().split(' ')
        const resp = await endpoint(req.body,...params)
        if (endpointName === 'help') {
            return res.json({
                ...resp
            })
        }
        return res.json({
            text: resp,
            response_type: 'comment',
        })
    }
});

app.post("/check-result", async ( req, res ) => {
    console.log('Received post on check result endpoint')
    if (!process.env.TOKEN.split(',').includes(req.body.token)) { 
        return
    }
    const cmd = `${req.body.text.replace('!betaservices', '').trim()}`.split(' ').map(c => c.trim()).join(' ')
    const endpointNames = ENDPOINTS_NAME.filter(endpointName => cmd.startsWith(endpointName))
    console.log("Endpoint response :", endpointNames)
    if (endpointNames.length === 1) {
        // const endpoint = ENDPOINTS.find(endpoint => endpoint.name.split('_').join(' ') === endpointNames[0])
        // const endpointName = endpoint.name.split('_').join(' ')
        // const params = cmd.replace(endpointName, '').trim().split(' ')
        const resp = await response(req.body)
        return res.json({
            text: resp,
            response_type: 'comment',
        })
    }
});

app.post("/feedback-function-call", async(req, res) => {
    console.log('Received feedback function call')
    if (!process.env.TOKEN.split(',').includes(req.body.token)) { 
        return
    }
    const cmd = `response ${req.body.text.trim()}`.split(' ').join(' ')
    const endpointNames = ENDPOINTS_NAME.filter(endpointName => cmd.startsWith(endpointName))
    console.log("Endpoint feedback :", endpointNames)
    let text
    if (!endpointNames.length) {
        text = 'Aucune fonction ne correspond a cette appel'
    } else if (endpointNames.length > 2) {
        text = 'Plusieurs fonctions correspondent à la commande'
    } else {
        text = "Je traite ta demande: `" + req.body.text + "`..."
    }
    return text
});

// start the Express server
app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

