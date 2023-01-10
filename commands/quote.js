const memer = require("random-jokes-api");

module.exports = {
    name: 'quote',
    description: 'Replies with a quote!',
    async execute(message, args) {
        try {            
            message.reply(memer.quotes()); 
            console.log('memerAPI CALL!');
        } catch (error) {
            console.log(error);
        }       
    }
};