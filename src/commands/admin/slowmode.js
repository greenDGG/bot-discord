const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'slowmode',
  alias: ['sm', 'lento'],
  description: 'Configura el modo lento del canal (en segundos, 0 para desactivar)',
  category: 'admin',
  options: [
    { name: 'segundos', type: 'INTEGER', required: true, description: 'Segundos (0 - 21600)' },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return ctx.reply('No tienes permisos para gestionar canales.');

    const seconds = ctx.args.segundos;
    if (isNaN(seconds) || seconds < 0 || seconds > 21600)
      return ctx.reply('Indica un número de segundos válido (0 - 21600).');

    await ctx.channel.setRateLimitPerUser(seconds);

    if (seconds === 0) return ctx.reply('⏱️ Modo lento desactivado.');
    ctx.reply(`⏱️ Modo lento configurado a **${seconds}s** por mensaje.`);
  },
};
