const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'meme',
  alias: [],
  description: 'Muestra un meme de r/SpanishMeme',
  category: 'fun',
  options: [],

  async run(ctx) {
    try {
      const res  = await fetch('https://www.reddit.com/r/SpanishMeme/hot.json?limit=25', {
        headers: { 'User-Agent': 'discord-bot/2.0' }
      });
      const data  = await res.json();
      const posts = data.data.children.filter(p =>
        !p.data.over_18 && !p.data.is_video && /\.(jpg|jpeg|png|gif)$/i.test(p.data.url)
      );
      if (!posts.length) return ctx.reply('No encontré memes :(');
      const post = posts[Math.floor(Math.random() * posts.length)].data;
      ctx.reply({ embeds: [new EmbedBuilder()
        .setColor(0x0008ff)
        .setTitle(post.title)
        .setImage(post.url)] });
    } catch {
      ctx.reply('Hubo un error al buscar memes');
    }
  },
};
