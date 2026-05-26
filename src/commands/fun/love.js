const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'love',
  alias: ['amor'],
  description: 'Calcula el porcentaje de amor con alguien',

  execute(client, message, args) {
    const user = message.mentions.users.first();
    if (!user) return message.channel.send('Menciona a alguien!');

    if (user.id === message.author.id) {
      return message.channel.send({ embeds: [new EmbedBuilder()
        .setTitle(`**${message.author.username}**`)
        .setDescription(':heart: **∞** :heart:')
        .setColor(0xFF001F)] });
    }

    const pct   = Math.floor(Math.random() * 100) + 1;
    const heart = pct >= 80 ? ':heart:' : pct >= 50 ? ':sparkling_heart:' : ':broken_heart:';
    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle(`${message.author.username} & ${user.username}`)
      .setDescription(`${heart} **${pct}%** ${heart}`)
      .setColor(0xFF001F)] });
  },
};
