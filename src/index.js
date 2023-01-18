const express = require( "express" );
const app = express();
const port = process.env.PORT; // default port to listen
app.use(express.json())  
// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

const TRIGGERS = {
    ops: [
        `nouvelle app sur scalingo`,
        `nouvelle app Scalingo`,
        `créer un compte`,
        `un nom de domaine en beta.gouv`,
        `demande d'apps supplémentaire sur scalingo`,
        `nous aimerions un domaine en .beta.gouv.fr`,
        `créer la mailing list`,
        `nouvelle mailing list`
    ],
    help: [
        `mail beta.gouv est arrivée à échéance`,
        `perdu mes accès à ma boite`,
        `plus accès à ma boîte`,
        `plus accès à mes mails`,
        `mon adresse email a été bloquée`,
        `n'arrive plus à accéder à son mail`,
        `n'arrive plus à accéder à son email`,
        `oublié mon mot de passe`,
        'envoyer un lien de ré initialisation de mot de passe',
        'ne parvient pas à accéder à son compte beta',
        'ne parvient pas à accéder à mon compte beta',
        `n'arrive plus à me connecter à ma boite roundcube`,
        `n'arrive plus à me connecter à sa boite roundcube`,
        `ne reçois plus mes mails`,
        `ne reçoit plus mes mails`,
        `mon mail beta n'existe plus`,
        `pas accès à mon adresse mail`,
        `pas non plus à me connecter à roundcube`,
        `pas me connecter sur mon adresse beta`,
        `mon adresse beta n'est pas  revenue`,
        `je n'ai plus accès à ma bal beta gouv`,
        `a été supprimée`,
        `mon email ne fonctionne plus`,
        `Soucis avec mon adresse`,
        `n'arrive pas à se connecter à Mattermost`,
        `ne peux plus accéder à ma boite`,
        `ne peut plus accéder à sa boite`,
        `réinitialiser mon mot de passe`,
        `email de bienvenue`,
        `n'a pas reçu le mail`,
        `perdu accès à sa boîte`,
        `perdu l'accès à ma boîte`,
        `perdu ses accès`,
        `organisation beta`,
        `organisation github`,
        `semble avoir été supprimé`,
        `semble avoir été désactivé`,
    ]
}

const buildText = {
    help: (params) => {
        return `Hello @${params.user_name}, tu sembles avoir un problème fréquent dont la réponse se trouve sans doute dans la doc :
https://doc.incubateur.net/communaute/travailler-a-beta-gouv/jutilise-les-outils-de-la-communaute/problemes-frequents
N'hésites pas aussi a utiliser la barre de recherche de la doc pour trouver la bonne page.`
    },
    ops: (params) => {
        return `Hello @${params.user_name}, si tu veux faire une demande d'ops (création d'app scalingo/sentry/matomo/domaine/updown/dashlane/...) tu peux utiliser le formulaire suivant :
${process.env.OPS_FORM_TEXT}`
    }
}

const ENDPOINTS = []
const ENDPOINTS_NAME = ENDPOINTS.map(endpoint => endpoint.name.split('_').join(' '))

app.post( "/", async ( req, res ) => {
    if (!process.env.TOKEN.split(',').includes(req.body.token)) { 
        return
    }
    let type
    const cmd = req.body.text.trim()
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
    const endpoint = ENDPOINTS.find(endpoint => endpoint.name === endpointNames[0])
    await endpoint(req, res)
});

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );

