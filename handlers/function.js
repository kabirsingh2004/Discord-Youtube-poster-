const Discord = require("discord.js");
const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  shards: "auto",
  disableEveryone: true,
});
const config = require("../config/config.json");

module.exports.embedbuilder = embedbuilder;
module.exports.errorbuilder = errorbuilder;
module.exports.escapeRegex = escapeRegex;


function embedbuilder(
  client,
  deletetime,
  message,
  color,
  title,
  description,
  thumbnail,
  author
) {
  try {
    if (title.includes("filter") && title.includes("Adding")) {
      client.infos.set(
        "global",
        Number(client.infos.get("global", "filters")) + 1,
        "filters"
      );
    }
  } catch { }
  try {
    let embed = new Discord.MessageEmbed()
      .setColor(color)
      .setFooter(config.footertext)
      .setAuthor(message.author.tag);
    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (author) embed.setAuthor(author);
    if (!deletetime || deletetime === undefined || deletetime === "null") {
      message.channel.send(embed).then((msg) => {
        try {
          if (msg.channel.type === "news") msg.crosspost();
        } catch (error) {
          console.log(error);
          errorbuilder(error.stack.toString().substr(0, 2000));
        }
      });
      return;
    }
    return message.channel.send(embed)
  } catch (error) {
    embedbuilder(
      client,
      5000,
      message,
      "RED",
      "ERROR: ",
      "```" +
      error.toString().substr(0, 100) +
      "```" +
      "\n\n**Error got sent to my owner!**"
    );
    errorbuilder(error.stack.toString().substr(0, 2000));
  }
}

function errorbuilder(error) {
  console.log(error);
}

function escapeRegex(str) {
  try {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  } catch (e) {
    console.log(String(e.stack).bgRed);
  }
}