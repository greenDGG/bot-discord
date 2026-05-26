module.exports = {
  name: 'resume',
  alias: ['continuar', 'continue'],
  description: 'Reanuda la música pausada',
  category: 'music',
  options: [],

  async run(ctx) {
    if (!ctx.member.voice.channel) return ctx.reply('Debes estar en un canal de voz');
    const queue = ctx.client.distube.getQueue(ctx.guild.id);
    if (!queue) return ctx.reply('No hay música en cola');
    if (!queue.paused) return ctx.reply('La música no está pausada');
    queue.resume();
    ctx.reply('▶ Música reanudada');
  },
};
