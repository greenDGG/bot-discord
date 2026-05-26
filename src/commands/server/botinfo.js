const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'botinfo',
  alias: ['bi'],
  description: 'Información sobre el bot',

  execute(client, message, args) {
    message.channel.send({ embeds: [new EmbedBuilder()
      .setAuthor({ name: 'Información del Bot', iconURL: client.user.displayAvatarURL() })
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        { name: '👑 Owner',          value: 'DenisGomezCrack', inline: true },
        { name: '⌨️ Desarrollador',  value: 'DenisGomezCrack', inline: true },
        { name: '📅 Creado',         value: '13/05/2021',      inline: true },
        { name: '🔧 Versión',        value: '14.0.0',          inline: true },
        { name: '💬 Lenguaje',       value: 'JavaScript',      inline: true },
        { name: '🔑 Prefijo',        value: 'xm!',             inline: true },
      )
      .setColor(0x8a00ff)] });
  },
};
