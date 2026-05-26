const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');
const cd  = require('../../utils/cooldown');

const trabajos = [
  'Policía', 'Piloto', 'FBI', 'Hacker', 'Panadero', 'Albañil',
  'Carpintero', 'Mecánico', 'Arqueólogo', 'Arquitecto', 'Abogado',
  'Programador', 'Diseñador', 'Bombero', 'Actor', 'Chef', 'Médico',
  'Profe', 'Taxista', 'Fontanero',
];

module.exports = {
  name: 'work',
  alias: ['trabajar', 'w'],
  description: `Trabaja para ganar dinero (cooldown ${eco.cooldowns.work / 1000}s)`,
  category: 'casino',
  options: [],

  async run(ctx) {
    const remaining = cd.check(ctx.user.id, 'work');
    if (remaining > 0)
      return ctx.reply(`${ctx.user}, espera **${remaining}s** antes de volver a trabajar.`);

    cd.set(ctx.user.id, 'work', eco.cooldowns.work);

    const key    = `${ctx.guild.id}.${ctx.user.id}`;
    const ganado = eco.rand(eco.work.min, eco.work.max);
    const job    = trabajos[Math.floor(Math.random() * trabajos.length)];
    await db.add(`${key}.dinero`, ganado);

    ctx.reply({ embeds: [new EmbedBuilder()
      .setTitle('💼 Trabajo')
      .setDescription(`${ctx.user} trabajó de **${job}** y ganó ${eco.fmt(ganado)}`)
      .setColor(0x00CC66)] });
  },
};
