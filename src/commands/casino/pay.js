const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');

module.exports = {
  name: 'pay',
  alias: ['pagar', 'transfer'],
  description: 'Transfiere dinero en mano a otro usuario',
  category: 'casino',
  options: [
    { name: 'usuario',  type: 'USER',    required: true, description: 'Usuario al que pagar' },
    { name: 'cantidad', type: 'INTEGER', required: true, description: 'Cantidad a transferir' },
  ],

  async run(ctx) {
    const err = t => ctx.reply({ embeds: [new EmbedBuilder().setColor(0xFF4444).setDescription(t)] });

    const target = ctx.args.usuario;
    const amount = ctx.args.cantidad;

    if (!target)          return err('Menciona al usuario.');
    if (target.id === ctx.user.id) return err('No puedes pagarte a ti mismo.');
    if (target.user.bot)  return err('No puedes pagar a un bot.');
    if (!amount || amount <= 0)    return err('La cantidad debe ser mayor a 0.');

    const senderKey = `${ctx.guild.id}.${ctx.user.id}`;
    const balance   = (await db.get(`${senderKey}.dinero`)) ?? 0;

    if (balance < amount)
      return err(`No tienes suficiente dinero. Tienes ${eco.fmt(balance)}.`);

    const targetKey = `${ctx.guild.id}.${target.id}`;
    await db.sub(`${senderKey}.dinero`, amount);
    await db.add(`${targetKey}.dinero`, amount);

    ctx.reply({ embeds: [
      new EmbedBuilder()
        .setColor(0x00c851)
        .setTitle('💸 Transferencia exitosa')
        .addFields(
          { name: '👤 De',       value: `${ctx.user}`,   inline: true },
          { name: '👤 Para',     value: `${target}`,     inline: true },
          { name: '💰 Cantidad', value: eco.fmt(amount), inline: true },
        )
        .setTimestamp(),
    ]});
  },
};
