const express = require( "express" );
const sentry = require('./module/sentry')
const app = express();
const port = process.env.PORT; // default port to listen
app.use(express.json())  
// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

const ENDPOINTS = [
    sentry.sentry_member,
    sentry.response_sentry_member
]
const ENDPOINTS_NAME = ENDPOINTS.map(endpoint => endpoint.name.split('_').join(' '))

app.post("/check-question", async ( req, res ) => {
    console.log('Received post on main endpoint')
    if (!process.env.TOKEN.split(',').includes(req.body.token)) { 
        return
    }
    const cmd = `${req.body.text.trim()}`.split(' ').map(c => c.trim()).join(' ')
    console.log("Endpoint quest :", cmd)
    const endpointNames = ENDPOINTS_NAME.filter(endpointName => endpointName.startsWith(cmd))
    if (!endpointNames.length === 1) {
        const endpoint = ENDPOINTS.find(endpoint => endpoint.name.split('_').join(' ') === endpointNames[0])
        const endpointName = endpoint.split('_').join(' ')
        const params = cmd.replace(endpointName, '').trim().split(' ')
        const resp = await endpoint(...params)
        return res.json({
            text: resp,
            response_type: 'comment',
        })
    }
});

app.post("/check-result", async ( req, res ) => {
    console.log('Received post on check result endpoint')
    console.log(req.body)
    if (!process.env.TOKEN.split(',').includes(req.body.token)) { 
        return
    }
    const cmd = `response ${req.body.text.trim()}`.split(' ').join(' ')
    console.log("Endpoint resp :", cmd)
    const endpointNames = ENDPOINTS_NAME.filter(endpointName => endpointName.startsWith(cmd))
    if (endpointNames.length === 1) {
        const endpoint = ENDPOINTS.find(endpoint => endpoint.name.split('_').join(' ') === endpointNames[0])
        const endpointName = endpoint.split('_').join(' ')
        const params = cmd.replace(endpointName, '').trim().split(' ')
        const resp = await endpoint(...params)
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
    console.log("Endpoint resp :", cmd)
    const endpointNames = ENDPOINTS_NAME.filter(endpointName => endpointName.startsWith(cmd))
    let text
    if (!endpointNames.length) {
        text = 'Aucune fonction ne correspond a cette appel'
    } else if (endpointNames.length > 2) {
        text = 'Plusieurs fonctions correspondent à la commande'
    } else {
        text = "Je traite ta demande: `" + req.body.text + "`..."
    }
    return text
})

// start the Express server
app.listen(port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

