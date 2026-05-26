module.exports = {
  name: 'stop',
  alias: ['parar'],
  description: 'Detiene la música y limpia la cola',

  execute(client, message, args) {
    if (!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz');
    const queue = client.distube.getQueue(message.guild.id);
    if (!queue) return message.channel.send('No hay música reproduciéndose');
    queue.stop();
    message.channel.send('⏹ Música detenida');
  },
};
