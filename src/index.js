const express = require( "express" );
const sentry = require('./module/sentry');
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

app.post( "/", async ( req, res ) => {
    if (!process.env.TOKEN.split(',').includes(req.body.token)) { 
        return
    }
    const cmd = `${req.body.text.trim()}`.split(' ').join(' ')
    console.log("Endpoint quest :", cmd)
    const endpointNames = ENDPOINTS_NAME.filter(endpointName => endpointName.startsWith(cmd))
    if (!endpointNames.length) {
        return res.status(404).json({
            'error': 'Aucun fonction ne correspond a cette appel'
        })
    }
    if (endpointNames.length > 2) {
        return res.status(404).json({
            'error': 'Plusieurs fonctions correspondent à la commande'
        })
    }
    const endpoint = ENDPOINTS.find(endpoint => endpoint.name.split('_').join(' ') === endpointNames[0])
    await endpoint(req, res)
});

app.post("/check-result", async ( req, res ) => {
    if (!process.env.TOKEN.split(',').includes(req.body.token)) { 
        return
    }
    const cmd = `response ${req.body.text.trim()}`.split(' ').join(' ')
    console.log("Endpoint resp :", cmd)
    const endpointNames = ENDPOINTS_NAME.filter(endpointName => endpointName.startsWith(cmd))
    if (!endpointNames.length) {
        return res.status(404).json({
            'error': 'Aucun fonction ne correspond a cette appel'
        })
    }
    if (endpointNames.length > 2) {
        return res.status(404).json({
            'error': 'Plusieurs fonctions correspondent à la commande'
        })
    }
    const endpoint = ENDPOINTS.find(endpoint => endpoint.name.split('_').join(' ') === endpointNames[0])
    await endpoint(req, res)
})

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

