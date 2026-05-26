const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'snipe',
  alias: ['sn'],
  description: 'Muestra el último mensaje eliminado del canal',
  category: 'fun',
  options: [],

  async run(ctx) {
    const sniped = ctx.client.sniped?.get(ctx.channel.id);
    if (!sniped) return ctx.reply('❌ No hay mensajes eliminados recientes en este canal.');

    const embed = new EmbedBuilder()
      .setColor(0x8a00ff)
      .setAuthor({ name: sniped.author.username, iconURL: sniped.author.displayAvatarURL() })
      .setDescription(sniped.content || '*[sin contenido de texto]*')
      .setFooter({ text: 'Mensaje eliminado' })
      .setTimestamp(sniped.deletedAt);

    if (sniped.image) embed.setImage(sniped.image);

    ctx.reply({ embeds: [embed] });
  },
};
