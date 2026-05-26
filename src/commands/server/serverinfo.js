const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  alias: ['svi'],
  description: 'Muestra información del servidor',

  async execute(client, message, args) {
    const owner = await message.guild.fetchOwner().catch(() => null);
    const roles  = message.guild.roles.cache.map(r => `${r}`).join(' | ').slice(0, 1024);

    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle(`Información de ${message.guild.name}`)
      .setThumbnail(message.guild.iconURL())
      .setColor(0x8a00ff)
      .addFields(
        { name: ':crown: Owner',                value: owner ? `${owner}` : 'Desconocido', inline: true },
        { name: ':tv: Canales',                 value: `${message.guild.channels.cache.size}`, inline: true },
        { name: ':busts_in_silhouette: Miembros', value: `${message.guild.memberCount}`, inline: true },
        { name: ':medal: Roles',                value: roles || 'Sin roles' },
        { name: 'ID',                           value: message.guild.id, inline: true },
        { name: ':map: Idioma',                 value: message.guild.preferredLocale, inline: true },
      )] });
  },
};
