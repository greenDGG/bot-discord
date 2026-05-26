const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');
const cd  = require('../../utils/cooldown');

const acciones = [
  'lavar coches', 'cantar en la calle', 'hacer malabarismos',
  'repartir volantes', 'pasear perros', 'vender limonada',
];

module.exports = {
  name: 'slut',
  alias: ['callejear'],
  description: 'Trabajo callejero con riesgo medio',
  options: [],

  async run(ctx) {
    const remaining = cd.check(ctx.user.id, 'slut');
    if (remaining > 0)
      return ctx.reply(`${ctx.user}, espera **${remaining}s** antes de intentarlo de nuevo.`);

    cd.set(ctx.user.id, 'slut', eco.cooldowns.slut);

    const key    = `${ctx.guild.id}.${ctx.user.id}`;
    const accion = acciones[Math.floor(Math.random() * acciones.length)];

    if (Math.random() < eco.slut.successRate) {
      const ganado = eco.rand(eco.slut.win.min, eco.slut.win.max);
      await db.add(`${key}.dinero`, ganado);
      ctx.reply({ embeds: [new EmbedBuilder()
        .setTitle('🎪 Trabajo ✅')
        .setDescription(`${ctx.user} estuvo **${accion}** y ganó ${eco.fmt(ganado)}`)
        .setColor(0x00CC66)] });
    } else {
      const perdido = eco.rand(eco.slut.lose.min, eco.slut.lose.max);
      const dinero  = (await db.get(`${key}.dinero`)) ?? 0;
      await db.set(`${key}.dinero`, Math.max(0, dinero - perdido));
      ctx.reply({ embeds: [new EmbedBuilder()
        .setTitle('🎪 Trabajo ❌')
        .setDescription(`${ctx.user} intentó **${accion}** pero fue un desastre.\nPerdió ${eco.fmt(perdido)}`)
        .setColor(0xFF4444)] });
    }
  },
};
