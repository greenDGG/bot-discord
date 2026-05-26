const { EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  name: 'ticket',
  alias: ['cupon'],
  description: 'Abre un sistema de tickets en este canal',

  execute(client, message, args) {
    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle('Abre un Ticket')
      .setDescription('Reacciona con 📩 para abrir un ticket de soporte')
      .setColor(0x8a00ff)] }).then(m => {
      m.react('📩').catch(() => null);

      m.createReactionCollector({
        filter: (r, u) => r.emoji.name === '📩' && !u.bot,
        time: 3600000,
      }).on('collect', (reaction, user) => {
        const everyone = m.guild.roles.cache.find(r => r.name === '@everyone');
        m.guild.channels.create({
          name: `ticket-${user.username}`,
          type: ChannelType.GuildText,
          permissionOverwrites: [
            { id: everyone.id, deny: [PermissionFlagsBits.ViewChannel] },
            { id: user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
          ],
        }).then(c => {
          c.send({ content: `${user}`, embeds: [new EmbedBuilder()
            .setTitle('Ticket Abierto')
            .setDescription('¡Hola! ¿En qué podemos ayudarte?')
            .setColor(Math.floor(Math.random() * 16777215))] });
        }).catch(() => null);
      });
    });
  },
};
