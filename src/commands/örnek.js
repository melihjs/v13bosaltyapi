const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "help",
    execute: function (client, message, args) {
        let embed = new MessageEmbed()
        .setDescription('Ghost Development: https://discord.gg/cmd')
        .setColor('RED');
        return message.reply({ 
            embeds: [ embed ],
            allowedMentions: { repliedUser: false }
        })
    }
}