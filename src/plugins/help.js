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
                        "url": "http://127.0.0.1:7357",
                        "context": {
                        "action": "do_something_ephemeral"
                        }
                    }
                    }, {
                    "id": "update",
                    "name": "Update",
                    "integration": {
                        "url": "http://127.0.0.1:7357",
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
