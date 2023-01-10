require('dotenv').config();

const fs = require('node:fs');

// Setting Up ChatGPT
const { Client, Collection, GatewayIntentBits, Presence } = require('discord.js');
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

// Setting up Bot
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

// Reading command
client.on('messageCreate', async function(message) {
    // Priorities the commands startswith prefix (>) but if theres not prefix,
    // then bot would switch to AI mode

    // BOT SECTION
    if (message.author.bot || !message.content.startsWith(prefix)) enableAI();

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;
    client.commands.get(command).execute(message, args);
    
    // ChatGPT SECTION
    async function enableAI() {
        try {
            if (message.author.bot) return;
            const gptResponse = await openai.createCompletion({
               model: "text-davinci-003",
               prompt: `Hey Give me a response for this: ${message.content}`,
               temperature: 0.5,
               max_tokens: 60,
               top_p: 1.0,
               frequency_penalty: 0.5,
               presence_penalty: 0.0,
            });

            message.reply(`${gptResponse.data.choices[0].text}`);
            console.log("chatGPT CALL");
            return;

        } catch(error){
            console.log(error);
        }
    }
}); 


client.login(process.env.DISCORD_TOKEN);