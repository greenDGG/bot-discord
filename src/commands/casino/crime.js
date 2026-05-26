const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');
const cd  = require('../../utils/cooldown');

const crimenes = [
  'robar una tienda', 'hackear un banco', 'vender artículos robados',
  'estafar a turistas', 'falsificar billetes', 'robar un coche',
];

module.exports = {
  name: 'crime',
  alias: ['crimen'],
  description: 'Intenta cometer un crimen (alto riesgo, alta recompensa)',
  category: 'casino',
  options: [],

  async run(ctx) {
    const remaining = cd.check(ctx.user.id, 'crime');
    if (remaining > 0)
      return ctx.reply(`${ctx.user}, espera **${remaining}s** antes de intentarlo de nuevo.`);

    cd.set(ctx.user.id, 'crime', eco.cooldowns.crime);

    const key    = `${ctx.guild.id}.${ctx.user.id}`;
    const accion = crimenes[Math.floor(Math.random() * crimenes.length)];

    if (Math.random() < eco.crime.successRate) {
      const ganado = eco.rand(eco.crime.win.min, eco.crime.win.max);
      await db.add(`${key}.dinero`, ganado);
      ctx.reply({ embeds: [new EmbedBuilder()
        .setTitle('🦹 Crimen ✅')
        .setDescription(`${ctx.user} intentó **${accion}** y salió limpio.\nGanó ${eco.fmt(ganado)}`)
        .setColor(0x00CC66)] });
    } else {
      const perdido = eco.rand(eco.crime.lose.min, eco.crime.lose.max);
      const dinero  = (await db.get(`${key}.dinero`)) ?? 0;
      await db.set(`${key}.dinero`, Math.max(0, dinero - perdido));
      ctx.reply({ embeds: [new EmbedBuilder()
        .setTitle('🦹 Crimen ❌')
        .setDescription(`${ctx.user} intentó **${accion}** y lo pillaron.\nPagó ${eco.fmt(perdido)} de multa.`)
        .setColor(0xFF4444)] });
    }
  },
};
