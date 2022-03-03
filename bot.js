const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = "-";

client.commands = new Discord.Collection;

const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("Bot is online");
});

client.on("message", (message) => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'verify') {
        client.commands.get('verify').execute(message, args);
    } else {
        message.channel.send("Invalid Command, Try again!")
    }
});

client.login('OTI0NTEyNTMwNzkyMDU0ODE0.YcfpYw.0C3fg7pbWQb6uWTtVsX06q0yHkM');