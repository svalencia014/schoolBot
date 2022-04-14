const Discord = require("discord.js");
const { Client, Intents } = require("discord.js");
const fs = require("fs");

//setup sentry
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

Sentry.init({
	dsn: "https://2e6aa87421a447c79bcda0734438e398@o1203317.ingest.sentry.io/6333100",
	tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
	op: "test",
	name: "My First Test Transaction",
});

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = "-";

client.commands = new Discord.Collection();

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
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "verify") {
    client.commands.get("verify").execute(message, args);
  } else if (command === "help") {
    client.commands.get("help").execute(message, args);
  } else {
    message.channel.send("Invalid Command, Try again!");
  }
});
client.login("haha");
