const { Client, Collection, MessageEmbed } = require('discord.js');
const { readdir } = require('fs');
const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
client.commands = new Collection();
client.config = require('./src/config');

client.on('ready', () => {
    console.log('hazır!');
    client.user.setPresence({ 
        activities: [
            { 
                name: 'Ghost Development',
                type: "COMPETING"
            }
        ] 
    });
    client.user.setStatus('idle');
});

readdir('./src/commands/', async (err, files) => {
    if (err) return console.error(err);
    files.forEach(async (file) => {
        let cmd = require(`./src/commands/${file}`);
        client.commands.set(cmd.name, cmd);
    });
});

client.on('message', async (message) => {
    var prefix = client.config.prefix;
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();
    var cmd = client.commands.get(command);
    if (!cmd) return;
    cmd.execute(client, message, args);
});

client.login(client.config.token);