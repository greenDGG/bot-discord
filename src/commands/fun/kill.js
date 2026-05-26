const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'kill',
  alias: ['matar'],
  description: 'Mata a alguien (gif animado)',

  async execute(client, message, args) {
    const user = message.mentions.members.first();
    if (!user) return message.reply('Menciona a alguien');
    try {
      const res  = await fetch('https://nekos.best/api/v2/kill');
      const data = await res.json();
      message.channel.send({ embeds: [new EmbedBuilder()
        .setTitle(`${message.author.username} mató a ${user.user.username} 💀`)
        .setColor(0x18CBDA)
        .setImage(data.results?.[0]?.url ?? null)] });
    } catch {
      message.channel.send(`${message.author} mató a ${user.user.username} 💀`);
    }
  },
};
