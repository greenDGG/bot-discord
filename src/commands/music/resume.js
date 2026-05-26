module.exports = {
  name: 'resume',
  alias: ['continuar', 'continue'],
  description: 'Reanuda la música pausada',

  execute(client, message, args) {
    if (!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz');
    const queue = client.distube.getQueue(message.guild.id);
    if (!queue) return message.channel.send('No hay música en cola');
    if (!queue.paused) return message.channel.send('La música no está pausada');
    queue.resume();
    message.channel.send('▶ Música reanudada');
  },
};
