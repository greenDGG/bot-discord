const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'cat',
  alias: ['gato'],
  description: 'Muestra una foto aleatoria de un gato',
  category: 'fun',
  options: [],

  async run(ctx) {
    try {
      const res  = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await res.json();
      ctx.reply({ embeds: [new EmbedBuilder()
        .setTitle('Gatos :kissing_heart:')
        .setColor(0x0008ff)
        .setImage(data[0].url)] });
    } catch {
      ctx.reply('No pude encontrar un gatito :(');
    }
  },
};
