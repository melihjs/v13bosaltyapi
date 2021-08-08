module.exports = {
    name: "ready",
    async execute(client) {
        var name = client.user.tag;
        console.log(`[HAZIR]: ${name} adıyla açıldım!`);
        client.user.setPresence({
            activities: [
                {
                    name: `${client.config.prefix}komut-ekle - v13 Boş Altyapı!`,
                    type: "COMPETING"
                }
            ],
            status: "idle"
        });
    }
}