const Meme = require("random-jokes-api");

module.exports = {
    name: 'quote',
    description: 'Replies with a quote!',
    async execute(message, args) {
        try {            
            message.reply(Meme.quotes()); 
            console.log('memerAPI CALL!');
        } catch (error) {
            console.log(error);
        }       
    }
};