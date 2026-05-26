const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'waifus',
  alias: ['monas', 'waifu'],
  description: 'Muestra una waifu aleatoria',
  category: 'fun',
  options: [],

  async run(ctx) {
    try {
      const res  = await fetch('https://api.waifu.pics/sfw/waifu');
      const data = await res.json();
      const msg  = await ctx.channel.send({ embeds: [new EmbedBuilder()
        .setColor(0x0008ff)
        .setImage(data.url)] });
      msg.react('✅').catch(() => null);
      msg.react('❌').catch(() => null);
    } catch {
      ctx.reply('No pude encontrar una waifu :(');
    }
  },
};
