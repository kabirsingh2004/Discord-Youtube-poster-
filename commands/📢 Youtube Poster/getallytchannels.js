const { Client, Message, MessageEmbed } = require('discord.js');
const { prefix, config } = require('../..');

module.exports = {
    name: 'getallytchannels',
    aliases: ['getalluser'],
    categories: 'yt_poster',
    description: 'Get all setup Channels of this Guild',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        //get all channels
        client.YTP.getAllChannels(message.guild.id)
            .then(chs => {
                message.channel.send(
                    new MessageEmbed()
                       .setColor(config.colors.yes)
                        .setDescription(`There are ${chs.length} Channels Setupped!`)
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