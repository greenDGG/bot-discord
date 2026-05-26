const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'dog',
  alias: ['perro'],
  description: 'Muestra una foto aleatoria de un perro',

  async execute(client, message, args) {
    try {
      const res  = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      message.channel.send({ embeds: [new EmbedBuilder()
        .setTitle('Perritos :dog:')
        .setColor(0x0008ff)
        .setImage(data.message)] });
    } catch {
      message.channel.send('No pude encontrar un perrito :(');
    }
  },
};
