const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'role',
  alias: ['rol'],
  description: 'Da o quita un rol a un usuario',

  async execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles))
      return message.channel.send('No tienes permisos para gestionar roles.');
    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles))
      return message.channel.send('No tengo permisos para gestionar roles.');

    const user = message.mentions.members.first();
    if (!user) return message.channel.send('Menciona al usuario.');

    const role = message.mentions.roles.first();
    if (!role) return message.channel.send('Menciona el rol.');

    if (role.position >= message.guild.members.me.roles.highest.position)
      return message.channel.send('No puedo gestionar ese rol porque está por encima del mío.');
    if (role.position >= message.member.roles.highest.position)
      return message.channel.send('No puedes gestionar un rol igual o superior al tuyo.');

    if (user.roles.cache.has(role.id)) {
      await user.roles.remove(role);
      return message.channel.send(`Se quitó el rol **${role.name}** a ${user}.`);
    }

    await user.roles.add(role);
    message.channel.send(`Se dio el rol **${role.name}** a ${user}.`);
  },
};
