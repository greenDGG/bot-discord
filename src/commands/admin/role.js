const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'role',
  alias: ['rol'],
  description: 'Da o quita un rol a un usuario',
  category: 'admin',
  options: [
    { name: 'usuario', type: 'USER', required: true, description: 'Usuario objetivo' },
    { name: 'rol',     type: 'ROLE', required: true, description: 'Rol a dar o quitar' },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.ManageRoles))
      return ctx.reply('No tienes permisos para gestionar roles.');
    if (!ctx.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles))
      return ctx.reply('No tengo permisos para gestionar roles.');

    const user = ctx.args.usuario;
    if (!user) return ctx.reply('Menciona al usuario.');

    const role = ctx.args.rol;
    if (!role) return ctx.reply('Menciona el rol.');

    if (role.position >= ctx.guild.members.me.roles.highest.position)
      return ctx.reply('No puedo gestionar ese rol porque está por encima del mío.');
    if (role.position >= ctx.member.roles.highest.position)
      return ctx.reply('No puedes gestionar un rol igual o superior al tuyo.');

    if (user.roles.cache.has(role.id)) {
      await user.roles.remove(role);
      return ctx.reply(`Se quitó el rol **${role.name}** a ${user}.`);
    }

    await user.roles.add(role);
    ctx.reply(`Se dio el rol **${role.name}** a ${user}.`);
  },
};
