module.exports = {
  name: 'stop',
  alias: ['parar'],
  description: 'Detiene la música y limpia la cola',
  options: [],

  async run(ctx) {
    if (!ctx.member.voice.channel) return ctx.reply('Debes estar en un canal de voz');
    const queue = ctx.client.distube.getQueue(ctx.guild.id);
    if (!queue) return ctx.reply('No hay música reproduciéndose');
    queue.stop();
    ctx.reply('⏹ Música detenida');
  },
};
