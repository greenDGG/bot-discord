const { EmbedBuilder } = require('discord.js');
const { configDB } = require('../../utils/db');

module.exports = {
  name: 'sugerencia',
  alias: ['suggest', 'sug'],
  description: 'Envía una sugerencia al canal configurado',
  category: 'server',
  options: [
    { name: 'sugerencia', type: 'STRING', required: true, description: 'Tu sugerencia', rest: true },
  ],

  async run(ctx) {
    const text = ctx.args.sugerencia;
    if (!text) {
      return ctx.reply('❌ Escribe tu sugerencia. Ej: `!sugerencia Agregar más música`');
    }

    const channels  = await configDB.get(`channels_${ctx.guild.id}`) ?? {};
    const channelId = channels.suggest;
    const channel   = channelId
      ? ctx.guild.channels.cache.get(channelId)
      : ctx.guild.channels.cache.find(c => c.name === 'sugerencias' || c.name === 'suggestions');

    if (!channel) {
      return ctx.reply(
        '❌ No hay canal de sugerencias configurado.\n' +
        'Un administrador debe usar `!setchannel sugerencias #canal`.',
      );
    }

    const embed = new EmbedBuilder()
      .setColor(0x8a00ff)
      .setAuthor({ name: ctx.user.username, iconURL: ctx.user.displayAvatarURL() })
      .setTitle('💡 Nueva Sugerencia')
      .setDescription(text)
      .addFields({ name: '📍 Enviada desde', value: `${ctx.channel}`, inline: true })
      .setFooter({ text: `ID: ${ctx.user.id}` })
      .setTimestamp();

    const sent = await channel.send({ embeds: [embed] });
    await sent.react('✅').catch(() => null);
    await sent.react('❌').catch(() => null);

    const confirm = await ctx.channel.send({ embeds: [
      new EmbedBuilder()
        .setColor(0x00c851)
        .setDescription(`✅ Tu sugerencia fue enviada a ${channel}.`),
    ]});
    setTimeout(() => {
      confirm.delete().catch(() => null);
      ctx.message?.delete().catch(() => null);
    }, 5000);
  },
};
