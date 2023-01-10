require('dotenv').config();
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'weather',
    description: 'Replies with the weather forecast at location!',
    execute(message, args) {
        const location = args[0];
        // minimum day to forecast is 1
        let days = 1;
        if (args[1] != undefined) {
            days = args[1];
            if (days > 7) {
                days = 7;
            } else if (days < 1) {
                days = 1;
            }
        }
        
        if (location === 'help') {
            message.reply('Usecase: (>weather {location} {days}), maximum of 7 day forecast.');
            return;
        } else if (location === undefined) {
            message.reply('Please enter a valid location!');
            return;
        }

        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${location}&days=${days}&aqi=no&alerts=no`)
        .then((res) => {
            const newEmbed = new EmbedBuilder()
            .setColor('#00ddff')
            .setTimestamp()
            .setFooter({ text: 'Weather Command' })
            .setTitle(`${location} Weather For The Next ${days} Day(s).`);

            for (let dayCount = 0; dayCount < days; dayCount++) {
                // Weather components
                let weather = res.data.forecast.forecastday[dayCount].day.condition.text;
                let date = res.data.forecast.forecastday[dayCount].date;
                let temperature = res.data.forecast.forecastday[dayCount].day.avgtemp_c;

                // Set the multi values in an array
                const values = [`Weather: ${weather}`,`\nTemperature: ${temperature}*C`];
            
                newEmbed.addFields({ name: `Date: ${date}`, value: `${values}`, inline: false })
            }

            message.reply({ embeds: [newEmbed] });
            console.log(`Displaying Weather Forecast in ${location} for the next ${days} day(s)!`);
        })
        .catch((err) => {
            console.log(err);
        });
    }
};