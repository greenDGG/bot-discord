const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'love',
  alias: ['amor'],
  description: 'Calcula el porcentaje de amor con alguien',
  category: 'fun',
  options: [
    { name: 'usuario', type: 'USER', required: true, description: 'Usuario con quien calcular' },
  ],

  async run(ctx) {
    const user = ctx.args.usuario;
    if (!user) return ctx.reply('Menciona a alguien!');

    if (user.id === ctx.user.id) {
      return ctx.reply({ embeds: [new EmbedBuilder()
        .setTitle(`**${ctx.user.username}**`)
        .setDescription(':heart: **∞** :heart:')
        .setColor(0xFF001F)] });
    }

    const pct   = Math.floor(Math.random() * 100) + 1;
    const heart = pct >= 80 ? ':heart:' : pct >= 50 ? ':sparkling_heart:' : ':broken_heart:';
    ctx.reply({ embeds: [new EmbedBuilder()
      .setTitle(`${ctx.user.username} & ${user.user.username}`)
      .setDescription(`${heart} **${pct}%** ${heart}`)
      .setColor(0xFF001F)] });
  },
};
