const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'clear',
  alias: ['limpiar'],
  description: 'Borra mensajes del canal',
  category: 'admin',
  options: [
    { name: 'cantidad', type: 'INTEGER', required: true, description: 'Número de mensajes (1-100)' },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return ctx.reply('No tienes permisos para gestionar mensajes');

    const amount = Math.min(Math.max(ctx.args.cantidad ?? 0, 1), 100);
    if (!amount) return ctx.reply('Escribe un número entre 1 y 100.');

    const deleted = await ctx.channel.bulkDelete(amount, true).catch(() => null);
    const count   = deleted?.size ?? 0;
    const extra   = count < amount ? ` (${amount - count} ignorados por tener +14 días)` : '';

    const msg = await ctx.channel.send(`✅ Se borraron **${count}** mensajes.${extra}`);
    setTimeout(() => msg.delete().catch(() => null), 5000);
  },
};
