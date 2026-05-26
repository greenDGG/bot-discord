module.exports = {
  name: 'pause',
  alias: ['pausar'],
  description: 'Pausa la música',

  execute(client, message, args) {
    if (!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz');
    const queue = client.distube.getQueue(message.guild.id);
    if (!queue) return message.channel.send('No hay música reproduciéndose');
    if (queue.paused) return message.channel.send('La música ya está pausada');
    queue.pause();
    message.channel.send('⏸ Música pausada');
  },
};
