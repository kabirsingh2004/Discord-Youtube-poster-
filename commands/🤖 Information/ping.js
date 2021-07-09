const { Client, Message, MessageEmbed } = require('discord.js');
const config = require("../../config/config.json");

module.exports = {
  name: 'ping',
  aliases: ['api'],
  description: 'Get Bot Ping..',
  useage: 'ping',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args) => {
    message.channel.send(
      new MessageEmbed()
        .setColor(config.colors.yes)
        .setFooter(config.footertext)
        .setTitle(`${'🎈'} Pinging....`)
    ).then(msg => {
      msg.edit(
        new MessageEmbed()
          .setColor(config.colors.yes)
          .setFooter(config.footertext)
          .setDescription(`🎈 Ping : \`\`${client.ws.ping}ms\`\``)
      )
    })
  }
}