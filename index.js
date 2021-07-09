const Discord = require("discord.js");
const { Client, Message, MessageEmbed, Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config/config.json");
const YoutubePoster = require("discord-yt-poster");

// client define
const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: "auto",
    disableEveryone: true,
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

// // MongoDB
// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoose, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then(console.log("MongoDB Conneted.."));

const prefix = config.prefix;
client.prefix = prefix;
client.config = config;
module.exports = config;
const token = config.token;
module.exports = client;
client.YTP = new YoutubePoster(client);
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", async (message) => {
    const { escapeRegex } = require("./handlers/function");
    if (!message.guild) return;
    if (message.author.bot) return;
    if (message.channel.partial) await message.channel.fetch();
    if (message.partial) await message.fetch();
    const prefixRegex = new RegExp(
        `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
    );
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) {
        if (matchedPrefix.includes(client.user.id)) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setColor("RED")
                    .setFooter("Made By Kabir Jaipal aka Tech Boy Gaming")
                    .setAuthor(message.author.tag)
                    .setTitle(`Hugh? I got pinged? Imma give you some help`)
                    .setDescription(
                        `<@${message.author.id}>To see all Commands type: \`${prefix}help\``
                    )
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            );
        }
    }
});


client.login(token)
