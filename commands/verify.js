const { Client, Intents } = require('discord.js');
const mailjet = require('node-mailjet').connect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_SECRET
);
email = null;
userEmail = null;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
    name: 'verify', 
    description: 'Allows the User to verify',
    execute(message, args) {
        
        let memberTarget = message.guild.members.cache.get(message.author.id);
        message.channel.send("We need to verify a few things before we give you access.");
        message.channel.send("What is your **school** email address?");
        sleep(5500);
        const filter = (message) => !message.author.bot || message.author == memberTarget;
        const collector = message.channel.createMessageCollector({ filter, max: 1, time: 10000 });
        collector.on('collect', m => {
            console.log(`Collected ${m.content}`);
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
            email = collected.first();
            console.log(email.content);
            userEmail = email.content;              //The email of the recipient
            message.channel.send("Thank you. Please wait a moment while I email you a code.");
        });

        var code = Math.floor(100000 + Math.random() * 900000)
        console.log(code);
        
        //send email here
        const request = mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'svalencia@ftstudent.org',
                        Name: 'Me',
                    },
                    To: [
                       {
                        Email: `${userEmail}`, 
                        Name: 'You',
                       }
                    ],
                    TemplateID: 3705855,
                    TemplateLanguage: true,
                    Subject: 'Discord Verification Code',
                    TextPart: `Here is your verification code. ${code}`,
                    HTMLPart: `<h2>Here is your verification code.</h2> <p>${code}</p>`
                }
            ]
        })
        request
            .then(result => {
                console.log(result.body)
            })
            .catch(err => {
                console.error(err.statusCode)
            })
    }
}