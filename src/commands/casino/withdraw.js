const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');

module.exports = {
  name: 'withdraw',
  alias: ['retirar', 'with'],
  description: 'Retira dinero del banco a tu mano (withdraw <cantidad|all>)',

  async execute(client, message, args) {
    const key   = `${message.guild.id}.${message.author.id}`;
    const banco = (await db.get(`${key}.banco`)) ?? 0;
    const err   = t => message.channel.send({ embeds: [new EmbedBuilder().setColor(0xFF4444).setDescription(t)] });

    if (!args[0]) return err(`Indica una cantidad o escribe \`all\`.\nTienes ${eco.fmt(banco)} en el banco.`);

    const amount = args[0].toLowerCase() === 'all' ? banco : parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) return err('Escribe una cantidad válida.');
    if (amount > banco) return err(`No tienes suficiente en el banco. Tienes ${eco.fmt(banco)}.`);

    await db.sub(`${key}.banco`,  amount);
    await db.add(`${key}.dinero`, amount);
    const dinero = (await db.get(`${key}.dinero`)) ?? 0;

    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle('🏧 Retiro realizado')
      .setColor(0x8a00ff)
      .addFields(
        { name: 'Retirado',  value: eco.fmt(amount), inline: true },
        { name: 'En mano',   value: eco.fmt(dinero), inline: true },
      )] });
  },
};
