const { Client, Message, MessageEmbed } = require('discord.js');
const { prefix, config } = require('../..');

module.exports = {
    name: 'deleteallytchannels',
    aliases: ['delallytuser'],
    categories: 'yt_poster',
    description: 'Delete/Remove all setup Channels of this Guild',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setDescription(":x: You are not allowed to execute this Command!")
        )

        //delete all channels method
        client.YTP.deleteAllChannels(message.guild.id)
            .then(data => {
                message.channel.send(
                    new MessageEmbed()
                       .setColor(config.colors.yes)
                        .setDescription(`I deleted ${data.deletedChannels.length} Channels`)
                        .setAuthor(message.author.tag)
                        .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
                        .setFooter(config.footertext)
                ).then(msg => msg.react("👍"))
            }).catch(e => {
                console.log(e);
                message.channel.send(`${e.message ? e.message : e}`, {
                    code: "js"
                })
            })

    }
}