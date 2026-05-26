module.exports = {
  name: 'play',
  alias: ['p'],
  description: 'Reproduce una canción o playlist (YouTube, Spotify)',
  options: [
    { name: 'cancion', type: 'STRING', required: true, description: 'Nombre o URL de la canción', rest: true },
  ],

  async run(ctx) {
    const query = ctx.args.cancion;
    if (!query) return ctx.reply('Escribe el nombre o URL de una canción');

    const voiceChannel = ctx.member.voice.channel;
    if (!voiceChannel) return ctx.reply('Debes estar en un canal de voz');

    const botVC = ctx.guild.members.me?.voice?.channel;
    if (botVC && voiceChannel.id !== botVC.id)
      return ctx.reply('Debes estar en el mismo canal de voz que yo');

    try {
      await ctx.client.distube.play(voiceChannel, query, {
        member: ctx.member,
        textChannel: ctx.channel,
      });
    } catch (err) {
      ctx.reply(`Error: ${err.message}`);
    }
  },
};
