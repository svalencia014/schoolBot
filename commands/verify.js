const { Client, Intents } = require('discord.js');
items = 1;
email = null;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
    name: 'verify', 
    description: 'Allows the User to verify',
    execute(message, args) {
        let memberTarget = message.guild.members.cache.get(message.author.id);
        message.channel.send("We need to verify a few things before we give you access.");
        message.channel.send("What is your **school** email address?");
        sleep(5500);
        const filter = (message) => !message.author.bot
        const collector = message.channel.createMessageCollector({ filter, max: 1, time: 5000 });
        collector.on('collect', m => {
            console.log(`Collected ${m.content}`);
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
            email = collected;
        });
        

        var code = Math.floor(100000 + Math.random() * 900000)
        console.log(code);
        
        //send email here

    }
}