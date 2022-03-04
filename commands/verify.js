const { Client, Intents } = require('discord.js');
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    name: 'verify',
    description: 'Allows the User to verify',
    execute(message, args) {
        message.channel.send("We need to verify a few things before we give you access.");
        message.channel.send("What is your **school** email address?");
        sleep(1500);
        const collector = message.channel.createMessageCollector({ time: 5000 });
        collector.on('collect', m => {
            console.log(`Collected ${m.content}`);
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
        var code = Math.floor(100000 + Math.random() * 900000)
        console.log(code);
        //send email here

    }
}