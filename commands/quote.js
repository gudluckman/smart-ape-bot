const memer = require("random-jokes-api");

module.exports = {
    name: 'quote',
    description: 'Replies with a quote!',
    async execute(message, args) {
        try {            
            message.reply(memer.quotes()); 
            console.log('Displaying memerAPI call!');
        } catch (error) {
            console.log(error);
        }       
    }
};