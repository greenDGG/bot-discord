module.exports = {
  name: 'skip',
  alias: ['saltar'],
  description: 'Salta a la siguiente canción',
  category: 'music',
  options: [],

  async run(ctx) {
    if (!ctx.member.voice.channel) return ctx.reply('Debes estar en un canal de voz');
    const queue = ctx.client.distube.getQueue(ctx.guild.id);
    if (!queue) return ctx.reply('No hay música en cola');
    await queue.skip();
    ctx.reply('⏭ Canción saltada');
  },
};
