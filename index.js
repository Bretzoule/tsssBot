require("dotenv").config();
const {
  snek,
  help,
  list,
  addToList,
  removeFromList,
} = require("./commands/commands");
const Discord = require("discord.js");
const myToken = process.env.TOKEN;
const prefix = ".tss";

let desagreable = [
  "nuls",
  "nul",
  "gueule",
  "bah",
  "merde",
  "tg",
  "plots",
  "plot",
  "foutre",
];

const djulo = "248164930652602368";

const client = new Discord.Client();

client.on("ready", () => {
  client.user.setActivity("Tsss 🐍 | .tss to tsssss...");
});

function parseCommand(message) {
  const channel = message.channel;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  try {
    message.delete();
  } catch (error) {
    console.log(error);
  }
  switch (command) {
    case "snek":
      snek(channel, args[0]);
      break;
    case "list":
      list(channel, desagreable);
      break;
    case "add":
      if (message.author.id != djulo) addToList(desagreable, args[0]);
      break;
    case "remove":
      if (message.author.id != djulo) desagreable = removeFromList(desagreable, args[0]);
      break;
    default:
      help(channel);
      break;
  }
}

function isCommand(message) {
  return (
    message.content.startsWith(prefix) &&
    message.author.bot === false &&
    message.channel.type !== "dm"
  );
}

function tsss(message) {
  try {
    message.react("🐍");
  } catch (error) {
    message.channel.send("🐍");
  }
}

function isSnakey(message) {
  return (
    message.author.id == djulo &&
    desagreable.some((element) => message.content.includes(element))
  );
}

client.on("message", async (message) => {
  if (isSnakey(message)) {
    tsss(message);
  }
  if (!isCommand(message)) return;
  parseCommand(message);
  return;
});

client.login(myToken);