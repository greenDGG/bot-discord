const { EmbedBuilder } = require('discord.js');
const { levelsDB } = require('../../utils/db');
const { xpParaSiguienteNivel } = require('../../utils/levels');

module.exports = {
  name: 'leaderboard',
  alias: ['top', 'lb', 'ranking'],
  description: 'Muestra el top de usuarios por nivel',
  category: 'general',
  options: [],

  async run(ctx) {
    const all = await levelsDB.all();
    const entries = all
      .filter(e => e.id.startsWith(`${ctx.guild.id}.`))
      .map(e => ({ userId: e.id.split('.')[1], ...e.value }))
      .sort((a, b) => b.nivel - a.nivel || b.xp - a.xp)
      .slice(0, 10);

    if (!entries.length) return ctx.reply('❌ Nadie tiene XP en este servidor todavía.');

    const medals = ['🥇', '🥈', '🥉'];
    const lines  = entries.map((e, i) => {
      const member = ctx.guild.members.cache.get(e.userId);
      const name   = member ? member.displayName : `<@${e.userId}>`;
      const prefix = medals[i] ?? `\`${String(i + 1).padStart(2, ' ')}.\``;
      const barra  = '█'.repeat(Math.floor((e.xp / xpParaSiguienteNivel(e.nivel)) * 10)) +
                     '░'.repeat(10 - Math.floor((e.xp / xpParaSiguienteNivel(e.nivel)) * 10));
      return `${prefix} **${name}**\n└ Nivel **${e.nivel}** · \`${barra}\` ${e.xp}/${xpParaSiguienteNivel(e.nivel)} XP`;
    });

    ctx.reply({ embeds: [
      new EmbedBuilder()
        .setColor(0x8a00ff)
        .setTitle('🏆 Ranking de niveles')
        .setDescription(lines.join('\n'))
        .setThumbnail(ctx.guild.iconURL())
        .setFooter({ text: `${ctx.guild.name} · Top 10` })
        .setTimestamp(),
    ]});
  },
};
