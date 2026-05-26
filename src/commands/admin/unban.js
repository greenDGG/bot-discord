const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'unban',
  alias: [],
  description: 'Desbanea a un usuario por su ID',

  async execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers))
      return message.channel.send('No tienes permisos!');
    if (!args[0]) return message.channel.send('Proporciona el ID del usuario a desbanear');
    const user = await client.users.fetch(args[0]).catch(() => null);
    if (!user) return message.channel.send('No encontré ese usuario. Asegúrate de poner el ID correcto.');
    const reason = args.slice(1).join(' ') || 'Sin razón';
    await message.guild.members.unban(user, reason);
    message.channel.send(`**${user.tag}** ha sido desbaneado.`);
  },
};
