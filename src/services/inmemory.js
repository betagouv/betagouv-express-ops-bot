
module.exports = {
    IN_MEMORY_DB: {
        _postInfos: {},
        callbackIds: [],
        add_post_info: function(postId, data) {
            return this.postInfos[postId] = data
        },
        get_post_info: function(postId) {
            return this.postInfos[postId]
        },
        add_callback_id: function(callback_id) {
            this.callbackIds.push(callback_id)
        },
        verify_callback_id: function(callback_id) {
            let verified = false
            const index = this.callbackIds.findIndex((id) => { return id === callback_id })
            if (index !== -1) {
                verified = true
                this.callbackIds.splice(index, 1)
            }
            return verified
        }
    }
}
