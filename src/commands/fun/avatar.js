const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'avatar',
  alias: ['av'],
  description: 'Muestra el avatar de un usuario',

  execute(client, message, args) {
    const target = message.mentions.members.first() || message.member;
    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle(`Avatar de ${target.user.username}`)
      .setColor(0x0008ff)
      .setImage(target.user.displayAvatarURL({ size: 1024, dynamic: true }))] });
  },
};
