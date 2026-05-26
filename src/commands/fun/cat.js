const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'cat',
  alias: ['gato'],
  description: 'Muestra una foto aleatoria de un gato',

  async execute(client, message, args) {
    try {
      const res  = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await res.json();
      message.channel.send({ embeds: [new EmbedBuilder()
        .setTitle('Gatos :kissing_heart:')
        .setColor(0x0008ff)
        .setImage(data[0].url)] });
    } catch {
      message.channel.send('No pude encontrar un gatito :(');
    }
  },
};
