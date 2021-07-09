const { Collection, MessageEmbed, Client } = require('discord.js');
const { prefix } = require('../index');
const client = require('../index')
const config = require('../config/config.json')


client.on('message', async (message) => {

  if (message.author.bot) return;
  if (message.channel.partial) await message.channel.fetch();
  if (message.partial) await message.fetch();
  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;
  let command = client.commands.get(cmd)
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args)
  if (command) message.react('✅')
  if (!command) return message.reply(`Unkown command, try: ${prefix}help`).then((msg) => {
    msg.react('❌')
  })

})