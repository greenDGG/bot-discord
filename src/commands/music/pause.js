module.exports = {
  name: 'pause',
  alias: ['pausar'],
  description: 'Pausa la música',
  options: [],

  async run(ctx) {
    if (!ctx.member.voice.channel) return ctx.reply('Debes estar en un canal de voz');
    const queue = ctx.client.distube.getQueue(ctx.guild.id);
    if (!queue) return ctx.reply('No hay música reproduciéndose');
    if (queue.paused) return ctx.reply('La música ya está pausada');
    queue.pause();
    ctx.reply('⏸ Música pausada');
  },
};
