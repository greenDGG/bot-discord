const { EmbedBuilder } = require('discord.js');

const images = [
  'https://cdn.discordapp.com/attachments/791059877468438530/847909681794908250/1622172327786_polarr.jpg',
  'https://cdn.discordapp.com/attachments/791059877468438530/847909682098339900/1622076776370_polarr.jpg',
  'https://cdn.discordapp.com/attachments/791059877468438530/847909682366251008/1620866845074_polarr.jpg',
  'https://cdn.discordapp.com/attachments/791059877468438530/847909682827755600/1620249403794_polarr.jpg',
];

module.exports = {
  name: 'diseños',
  alias: ['designs'],
  description: 'Muestra un diseño aleatorio',

  execute(client, message, args) {
    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle('Diseños')
      .setImage(images[Math.floor(Math.random() * images.length)])
      .setColor(0x8a00ff)] });
  },
};
