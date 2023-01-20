
module.exports = {
    IN_MEMORY_DB: {
        _postInfos: {},
        _callbackIds: [],
        add_post_info: function(postId, data) {
            return this._postInfos[postId] = data
        },
        get_post_info: function(postId) {
            return this._postInfos[postId]
        },
        add_callback_id: function(callback_id) {
            this._callbackIds.push(callback_id)
        },
        verify_callback_id: function(callback_id) {
            let verified = false
            const index = this._callbackIds.findIndex((id) => { return id === callback_id })
            if (index !== -1) {
                verified = true
                this._callbackIds.splice(index, 1)
            }
            return verified
        }
    }
}
