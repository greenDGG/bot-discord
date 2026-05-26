module.exports = {
  name: 'play',
  alias: ['p'],
  description: 'Reproduce una canción o playlist (YouTube, Spotify)',

  async execute(client, message, args) {
    const query = args.join(' ');
    if (!query) return message.channel.send('Escribe el nombre o URL de una canción');

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send('Debes estar en un canal de voz');

    const botVC = message.guild.members.me?.voice?.channel;
    if (botVC && voiceChannel.id !== botVC.id)
      return message.channel.send('Debes estar en el mismo canal de voz que yo');

    try {
      await client.distube.play(voiceChannel, query, {
        member: message.member,
        textChannel: message.channel,
      });
    } catch (err) {
      message.channel.send(`Error: ${err.message}`);
    }
  },
};
