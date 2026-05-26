const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');

module.exports = {
  name: 'dep',
  alias: ['depositar', 'deposit'],
  description: 'Deposita dinero en el banco (dep <cantidad|all>)',
  category: 'casino',
  options: [
    { name: 'cantidad', type: 'STRING', required: true, description: 'Cantidad a depositar (o "all")' },
  ],

  async run(ctx) {
    const key    = `${ctx.guild.id}.${ctx.user.id}`;
    const dinero = (await db.get(`${key}.dinero`)) ?? 0;
    const err    = t => ctx.reply({ embeds: [new EmbedBuilder().setColor(0xFF4444).setDescription(t)] });

    const raw = ctx.args.cantidad;
    if (!raw) return err(`Indica una cantidad o escribe \`all\`.\nTienes ${eco.fmt(dinero)} en mano.`);

    const amount = raw.toLowerCase() === 'all' ? dinero : parseInt(raw);
    if (isNaN(amount) || amount <= 0) return err('Escribe una cantidad válida.');
    if (amount > dinero) return err(`No tienes suficiente. Tienes ${eco.fmt(dinero)} en mano.`);

    await db.sub(`${key}.dinero`, amount);
    await db.add(`${key}.banco`,  amount);
    const banco = (await db.get(`${key}.banco`)) ?? 0;

    ctx.reply({ embeds: [new EmbedBuilder()
      .setTitle('🏦 Depósito realizado')
      .setColor(0x8a00ff)
      .addFields(
        { name: 'Depositado', value: eco.fmt(amount), inline: true },
        { name: 'Banco',      value: eco.fmt(banco),  inline: true },
      )] });
  },
};
