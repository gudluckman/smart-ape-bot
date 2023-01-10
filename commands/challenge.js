const Meme = require("random-jokes-api");

module.exports = {
    name: 'dare',
    description: 'replies with a challenge!',
    async execute(message, args) {
        try {
            message.reply(Meme.dare()); 
            console.log('memerAPI CALL!');
        } catch (error) {
            console.log(error);
        }       
    }
};