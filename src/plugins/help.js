const config = require('../config')

module.exports = {
    help: () => {
        return {
            response_type: 'comment',
            attachments: [
                {
                "pretext": "Cloturer la demande.",
                // "text": "This is the attachment text.",
                "actions": [
                    // {
                    //     "id": "message",
                    //     "name": "Ephemeral Message",
                    //     "integration": {
                    //         "url": config.BOT_ENDPOINT + '/do-nothing',
                    //         "context": {
                    //             "token": config.AIRTABLE_INTERRACTIVE_TOKEN,
                    //             "action": "do_something_ephemeral"
                    //         }
                    //     }
                    // }, 
                    {
                        "id": "update",
                        "name": "Cloturer",
                        "integration": {
                            "url": config.BOT_ENDPOINT + '/set-finished',
                            "context": {
                                "token": config.AIRTABLE_INTERRACTIVE_TOKEN,
                                "action": "do_something_update"
                            }
                        }
                    }
                ]
                }
            ]
        }
    }
}
