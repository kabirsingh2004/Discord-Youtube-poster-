const { Client, Message, MessageEmbed } = require('discord.js');
const { readdirSync } = require("fs");
const config = require("../../config/config.json");
let prefix = config.prefix

module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'Shows all available bot commands',
  useage: 'help',
  /** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */
  run: async (client, message, args, user) => {
    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("HELP MENU 🔰 Commands")
        .addField('Prefix Information', `Prefix: \`${prefix}\`\nYou can also mention ${client.user} to get prefix info.`, false)
        .addField("• Developer", `\`\`\`yml\nName: ᴋᴀʙɪʀ々ꜱɪɴɢʜ🌙#8148 [821095540569407508]\nName Ξ Kabir Jaipal [821095540569407508]\`\`\``)
        .addField("• Important Links", `**[Invite Link](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)\`|\`[Support Server](https://discord.gg/KRX2tgNA7R)\`|\`[Youtube](https://www.youtube.com/channel/UCINCfgiBYCykOemiuVhqtIQ/)\`**`)
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ban\`.`
        )
        .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("RED")
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .setThumbnail(client.user.displayAvatarURL())
        .addField("PREFIX:", `\`${prefix}\``)
        .addField(
          "COMMAND:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "ALIASES:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "USAGE:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "DESCRIPTION:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  }
}