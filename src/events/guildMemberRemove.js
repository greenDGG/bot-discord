const { EmbedBuilder } = require('discord.js');
const { configDB } = require('../utils/db');
const config = require('../config');

module.exports = {
  name: 'guildMemberRemove',

  async execute(client, member) {
    const channels = await configDB.get(`channels_${member.guild.id}`) ?? {};
    const msgs     = await configDB.get(`messages_${member.guild.id}`) ?? {};

    const channelId = channels.goodbye || config.channels.goodbye;
    if (!channelId) return;

    const canal = client.channels.cache.get(channelId);
    if (!canal) return;

    const texto = (msgs.goodbye ?? '**{username}** ha dejado el servidor 😔')
      .replace(/{user}/g,        member.user.username)
      .replace(/{username}/g,    member.user.username)
      .replace(/{server}/g,      member.guild.name)
      .replace(/{membercount}/g, member.guild.memberCount);

    const embed = new EmbedBuilder()
      .setColor(0xff4444)
      .setTitle('🚪 Miembro salió')
      .setDescription(texto)
      .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
      .addFields({ name: '👥 Quedan', value: `${member.guild.memberCount} miembros`, inline: true })
      .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL() ?? undefined })
      .setTimestamp();

    canal.send({ embeds: [embed] });
  },
};
