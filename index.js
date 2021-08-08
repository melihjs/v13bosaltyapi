const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs');
const client = new Client({ 
    intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] 
});
client.events = new Collection();
client.commands = new Collection();
client.config = require('./config.json');

fs.readdir('./komutlar/', async (err, files) => {
    if (err) throw new Error(err);
    files.forEach(async (dosya) => {
        var cmd = require(`./komutlar/${dosya}`);
        client.commands.set(cmd.name, cmd);
    });
});

fs.readdir('./events/', async (err, files) => {
    if (err) throw new Error(err);
    files.forEach(async (dosya) => {
        var event = require(`./events/${dosya}`);
        client.events.set(event.name, event);
    });
});

const prefix = client.config.prefix;
client.on('messageCreate', async (message) => {
    client.events.get('messageCreate').execute(client, message, prefix)
});
client.on('ready', async () => client.events.get('ready').execute(client));
client.login(client.config.token);