const { PermissionFlagsBits } = require('discord.js');
const { warnsDB } = require('../../utils/db');

module.exports = {
  name: 'clearwarns',
  alias: ['borrarwarns', 'cw'],
  description: 'Borra todas las advertencias de un usuario',
  category: 'admin',
  options: [
    { name: 'usuario', type: 'USER', required: true, description: 'Usuario al que borrar las advertencias' },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.BanMembers))
      return ctx.reply('No tienes permisos!');

    const user = ctx.args.usuario;
    if (!user) return ctx.reply('Menciona al usuario al que quieres borrar las advertencias.');

    const key = `${ctx.guild.id}.${user.id}`;
    await warnsDB.delete(key);
    ctx.reply(`Las advertencias de **${user.displayName}** han sido borradas.`);
  },
};
