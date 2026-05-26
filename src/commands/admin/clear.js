const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'clear',
  alias: ['limpiar'],
  description: 'Borra mensajes del canal',
  options: [
    { name: 'cantidad', type: 'INTEGER', required: true, description: 'Número de mensajes (1-100)' },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return ctx.reply('No tienes permisos para gestionar mensajes');

    const amount = ctx.args.cantidad;
    if (!amount || isNaN(amount) || amount <= 0) return ctx.reply('Escribe un número válido mayor a 0');

    await ctx.channel.bulkDelete(amount, true);
    const msg = await ctx.channel.send(`**Se han borrado ${amount} mensajes correctamente**`);
    setTimeout(() => msg.delete().catch(() => null), 5000);
  },
};
