const fs = require('fs');

module.exports = {
    name: "test",
    async execute(client, message, args) {
        return message.reply({ 
            content: 'Test komutu!', 
            allowedMentions: { 
                repliedUser: false
            }
        });
    }
}