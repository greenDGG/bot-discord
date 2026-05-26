const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');
const config = require('../../config');

module.exports = {
  name: 'richest',
  alias: ['ricos', 'top', 'leaderboard'],
  description: 'Top 10 más ricos del servidor',

  async execute(client, message, args) {
    const guildData = (await db.get(message.guild.id)) ?? {};

    const entries = Object.entries(guildData)
      .map(([userId, data]) => ({
        userId,
        total: (data?.dinero ?? 0) + (data?.banco ?? 0),
      }))
      .filter(e => e.total > 0)
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);

    if (!entries.length)
      return message.channel.send('Nadie tiene dinero en este servidor todavía.');

    const medals = ['🥇', '🥈', '🥉'];
    const lines  = await Promise.all(entries.map(async ({ userId, total }, i) => {
      const member = message.guild.members.cache.get(userId)
        ?? await message.guild.members.fetch(userId).catch(() => null);
      const name = member?.displayName ?? `Usuario (${userId})`;
      const medal = medals[i] ?? `**${i + 1}.**`;
      return `${medal} ${name} — ${eco.fmt(total)}`;
    }));

    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle(`💰 Top 10 más ricos — ${message.guild.name}`)
      .setDescription(lines.join('\n'))
      .setColor(0xFFD700)
      .setFooter({ text: config.currency.name })] });
  },
};
