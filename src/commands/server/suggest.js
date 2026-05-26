const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'sugerencia',
  alias: ['suggest', 'sug'],
  description: 'Envía una sugerencia al canal #sugerencias',

  execute(client, message, args) {
    if (!args.length) return message.channel.send('Escribe tu sugerencia');
    const channel = message.guild.channels.cache.find(x => x.name === 'sugerencias' || x.name === 'suggestions');
    if (!channel) return message.channel.send('No hay un canal llamado `sugerencias` en este servidor');

    channel.send({ embeds: [new EmbedBuilder()
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
      .setDescription(args.join(' '))
      .setColor(0x8a00ff)
      .setTimestamp()] }).then(m => {
      m.react('✅').catch(() => null);
      m.react('❌').catch(() => null);
    });
    message.channel.send('Tu sugerencia se envió correctamente ✅');
  },
};
