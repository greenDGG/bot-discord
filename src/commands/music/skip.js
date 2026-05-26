module.exports = {
  name: 'skip',
  alias: ['saltar'],
  description: 'Salta a la siguiente canción',

  async execute(client, message, args) {
    if (!message.member.voice.channel) return message.channel.send('Debes estar en un canal de voz');
    const queue = client.distube.getQueue(message.guild.id);
    if (!queue) return message.channel.send('No hay música en cola');
    await queue.skip();
    message.channel.send('⏭ Canción saltada');
  },
};
