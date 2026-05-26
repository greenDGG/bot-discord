const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'waifus',
  alias: ['monas', 'waifu'],
  description: 'Muestra una waifu aleatoria',

  async execute(client, message, args) {
    try {
      const res  = await fetch('https://api.waifu.pics/sfw/waifu');
      const data = await res.json();
      const msg  = await message.channel.send({ embeds: [new EmbedBuilder()
        .setColor(0x0008ff)
        .setImage(data.url)] });
      msg.react('✅').catch(() => null);
      msg.react('❌').catch(() => null);
    } catch {
      message.channel.send('No pude encontrar una waifu :(');
    }
  },
};
