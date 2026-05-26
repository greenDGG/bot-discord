const { PermissionFlagsBits } = require('discord.js');
const { prefixDB } = require('../../utils/db');

module.exports = {
  name: 'setprefix',
  alias: ['sp'],
  description: 'Cambia el prefijo del bot en este servidor',
  category: 'admin',
  options: [
    { name: 'prefijo', type: 'STRING', required: true, description: 'Nuevo prefijo' },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.Administrator))
      return ctx.reply('No tienes permisos para cambiar el prefijo >:(');

    const newPrefix = ctx.args.prefijo;
    if (!newPrefix) return ctx.reply('Debes indicar un nuevo prefijo');

    await prefixDB.set(`prefix_${ctx.guild.id}`, newPrefix);

    const owner = await ctx.guild.fetchOwner().catch(() => null);
    owner?.send(`El prefijo ha sido cambiado a **${newPrefix}**`).catch(() => null);

    ctx.reply(`El prefijo ha sido cambiado a **${newPrefix}**`);
  },
};
