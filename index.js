require('dotenv').config();

const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const prefix = '>';

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`${client.user.tag} is online!`);
});

client.on('messageCreate', async function(message) {
    // Priorities the commands startswith prefix (>) but if theres not prefix,
    // then bot would switch to AI mode

    // BOT SECTION
    if (message.author.bot || !message.content.startsWith(prefix)) enableAI();

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(!client.commands.has(command)) return;
    client.commands.get(command).execute(message, args);
    
    // AI SECTION
    async function enableAI() {
        try {
            if(message.author.bot) return;
    
            const gptResponse = await openai.createCompletion({
                model: "davinci",
                prompt: `smart-ape-bot is a friendly chatbot.\n\
                smart-ape-bot: Hello, how are you?\n\
                ${message.author.username}: ${message.content}\n\
                smart-ape-bot:`,
                temperature: 0.9,
                max_tokens: 100,
                stop: ["smart-ape-bot:", "Luckman:"],
            })
            message.reply(`${gptResponse.data.choices[0].text}`);
            console.log("~~ chatGPT CALL");
            return;
        } catch(err){
            console.log(err);
        }
    }
}); 


client.login(process.env.DISCORD_TOKEN);