const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');

module.exports = {
  name: 'withdraw',
  alias: ['retirar', 'with'],
  description: 'Retira dinero del banco a tu mano (withdraw <cantidad|all>)',
  options: [
    { name: 'cantidad', type: 'STRING', required: true, description: 'Cantidad a retirar (o "all")' },
  ],

  async run(ctx) {
    const key   = `${ctx.guild.id}.${ctx.user.id}`;
    const banco = (await db.get(`${key}.banco`)) ?? 0;
    const err   = t => ctx.reply({ embeds: [new EmbedBuilder().setColor(0xFF4444).setDescription(t)] });

    const raw = ctx.args.cantidad;
    if (!raw) return err(`Indica una cantidad o escribe \`all\`.\nTienes ${eco.fmt(banco)} en el banco.`);

    const amount = raw.toLowerCase() === 'all' ? banco : parseInt(raw);
    if (isNaN(amount) || amount <= 0) return err('Escribe una cantidad válida.');
    if (amount > banco) return err(`No tienes suficiente en el banco. Tienes ${eco.fmt(banco)}.`);

    await db.sub(`${key}.banco`,  amount);
    await db.add(`${key}.dinero`, amount);
    const dinero = (await db.get(`${key}.dinero`)) ?? 0;

    ctx.reply({ embeds: [new EmbedBuilder()
      .setTitle('🏧 Retiro realizado')
      .setColor(0x8a00ff)
      .addFields(
        { name: 'Retirado', value: eco.fmt(amount), inline: true },
        { name: 'En mano',  value: eco.fmt(dinero), inline: true },
      )] });
  },
};
