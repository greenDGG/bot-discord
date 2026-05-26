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

  async execute(client, message, args) {
    const remaining = cd.check(message.author.id, 'work');
    if (remaining > 0)
      return message.channel.send(`${message.author}, espera **${remaining}s** antes de volver a trabajar.`);

    cd.set(message.author.id, 'work', eco.cooldowns.work);

    const key    = `${message.guild.id}.${message.author.id}`;
    const ganado = eco.rand(eco.work.min, eco.work.max);
    const job    = trabajos[Math.floor(Math.random() * trabajos.length)];
    await db.add(`${key}.dinero`, ganado);

    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle('💼 Trabajo')
      .setDescription(`${message.author} trabajó de **${job}** y ganó ${eco.fmt(ganado)}`)
      .setColor(0x00CC66)] });
  },
};
