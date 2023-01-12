module.exports = {
    name: 'clear',
    description: 'clearing the chat within a channel',
    async execute(message, args) {
        message.channel.messages.fetch()
        .then(messages => {
            // Bulk delete all messages in the channel
            message.channel.bulkDelete(messages);
            console.log('--- Cleared Chat ---');
        })
        .catch((err) => {
            console.log(err);
        })
    }
};