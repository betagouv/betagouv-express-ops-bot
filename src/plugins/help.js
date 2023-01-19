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
                    "id": "message",
                    "name": "Ephemeral Message",
                    "integration": {
                        "url": config.BOT_ENDPOINT + '/set-finished',
                        "context": {
                            "action": "do_something_ephemeral"
                        }
                    }
                    }, {
                    "id": "update",
                    "name": "Update",
                    "integration": {
                        "url": config.BOT_ENDPOINT + '/do-nothing',
                        "context": {
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
