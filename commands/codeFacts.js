const fact = require("clean-code-facts");

module.exports = {
    name: 'clean_code',
    description: 'replies with a fact!',
    async execute(message, args) {
        try {
            message.reply(fact.random()); 
            console.log('clean-code-factsAPI CALL!');
        } catch (error) {
            console.log(error);
        }       
    }
};