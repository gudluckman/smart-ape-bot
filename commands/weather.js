require('dotenv').config();
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'weather',
    description: 'Replies with the weather forecast at location!',
    execute(message, args) {
        const q = args[0];
        let days = 1;
        if (args[1] != undefined) {
            days = args[1];
            if (days > 3) {
                days = 3;
            } else if (days < 1) {
                days = 1;
            }
        }
        
        if (q === 'help') {
            message.reply('Usecase: (>weather {location} {days}), maximum of 3 day forecast.');
            return;
        } else if (q === undefined) {
            message.reply('Please enter a valid location!');
            return;
        }

        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${q}&days=${days}&aqi=no&alerts=no`)
        .then((res) => {
            const newEmbed = new MessageEmbed()
            .setTitle(`Weather Forecast in ${q} For The Next ${days} Day(s).`)
            .setColor('#0099ff');

            for (let index = 0; index < days; index++) {
                let forecastWeather = res.data.forecast.forecastday[index].day.condition.text;
                let forecastDate = res.data.forecast.forecastday[index].date;
                newEmbed.addField(`${forecastDate}`, `${forecastWeather}`, true);
            }

            message.reply({ embeds: [newEmbed] });
            console.log(`Displaying Weather Forecast in ${q} for the next ${days} day(s)!`);
        })
        .catch((err) => {
            console.log(err);
        });
    }
};