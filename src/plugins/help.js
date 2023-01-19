const config = require('../config')

module.exports = {
    help: () => {
        return {
            response_type: 'comment',
            attachments: [
                {
                "pretext": "This is the attachment pretext.",
                "text": "This is the attachment text.",
                "actions": [
                    {
                        "id": "action_options",
                        "name": "Select an option...",
                        "integration": {
                          "url": "http://127.0.0.1:7357/action_options",
                          "context": {
                            "action": "do_something"
                          }
                        },
                        "type": "input"
                    }
                    // {
                    //     "id": "message",
                    //     "name": "Ephemeral Message",
                    //     "integration": {
                    //         "url": config.BOT_ENDPOINT + '/set-finished',
                    //         "context": {
                    //             "token": config.AIRTABLE_INTERRACTIVE_TOKEN,
                    //             "action": "do_something_ephemeral"
                    //         }
                    //     }
                    // }, 
                    // {
                    //     "id": "update",
                    //     "name": "Update",
                    //     "integration": {
                    //         "url": config.BOT_ENDPOINT + '/do-nothing',
                    //         "context": {
                    //             "action": "do_something_update"
                    //         }
                    //     }
                    // }
                ]
                }
            ]
        }
    }
}
