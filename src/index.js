const express = require( "express" );
const { setTimeout } = require("timers/promises");

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
    updown.updown_check,
    updown.updown_delete,
    updown.updown_disable,
    updown.updown_enable,
    job.jobs,
    airtable.airtable,
    help.help
]
const ENDPOINTS_NAME = ENDPOINTS.map(endpoint => endpoint.name.split('_').join(' '))

async function response(ctx) {
    await setTimeout(10000);
    if (IN_MEMORY_DB[ctx.post_id]) {
        const job = await helper.getJobInfo(IN_MEMORY_DB[ctx.post_id].job_id)
        let text
        if (job.status === 'finished' && IN_MEMORY_DB[ctx.post_id].finished) {
            text = IN_MEMORY_DB[ctx.post_id].finished
        } else if (IN_MEMORY_DB[ctx.post_id].error) {
            text = IN_MEMORY_DB[ctx.post_id].error
        }
        return text
    }
}

app.post('/set-finished', async (req, res) => {
    console.log('SEt finished', req.body)
    if (req.body.context.token === config.AIRTABLE_INTERRACTIVE_TOKEN) {
        return res.json({
            "update": {
              "message": "Updated!",
              props: {}
            }
        })
    }
})

app.post('/do-nothing', async (req, res) => {
    console.log('Set do nothing', req.body)
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

