const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'unban',
  alias: [],
  description: 'Desbanea a un usuario por su ID',
  options: [
    { name: 'id',    type: 'STRING', required: true,  description: 'ID del usuario a desbanear' },
    { name: 'razon', type: 'STRING', required: false, description: 'Razón', rest: true },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.BanMembers))
      return ctx.reply('No tienes permisos!');

    const userId = ctx.args.id;
    if (!userId) return ctx.reply('Proporciona el ID del usuario a desbanear');

    const user = await ctx.client.users.fetch(userId).catch(() => null);
    if (!user) return ctx.reply('No encontré ese usuario. Asegúrate de poner el ID correcto.');

    const reason = ctx.args.razon || 'Sin razón';
    await ctx.guild.members.unban(user, reason);
    ctx.reply(`**${user.tag}** ha sido desbaneado.`);
  },
};
