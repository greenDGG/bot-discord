const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'dog',
  alias: ['perro'],
  description: 'Muestra una foto aleatoria de un perro',
  options: [],

  async run(ctx) {
    try {
      const res  = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await res.json();
      ctx.reply({ embeds: [new EmbedBuilder()
        .setTitle('Perritos :dog:')
        .setColor(0x0008ff)
        .setImage(data.message)] });
    } catch {
      ctx.reply('No pude encontrar un perrito :(');
    }
  },
};
