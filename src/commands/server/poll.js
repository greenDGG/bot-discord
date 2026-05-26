const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'poll',
  alias: ['encuesta', 'votacion'],
  description: 'Crea una encuesta con reacciones ✅ ❌',
  category: 'server',
  options: [
    { name: 'pregunta', type: 'STRING', required: true, description: 'Pregunta de la encuesta', rest: true },
  ],

  async run(ctx) {
    const pregunta = ctx.args.pregunta;

    const embed = new EmbedBuilder()
      .setColor(0x8a00ff)
      .setTitle('📊 Encuesta')
      .setDescription(pregunta)
      .setAuthor({ name: ctx.user.username, iconURL: ctx.user.displayAvatarURL() })
      .setFooter({ text: 'Vota con ✅ o ❌' })
      .setTimestamp();

    ctx.message?.delete().catch(() => null);
    const msg = await ctx.channel.send({ embeds: [embed] });
    await msg.react('✅').catch(() => null);
    await msg.react('❌').catch(() => null);
  },
};
