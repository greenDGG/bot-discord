const { PermissionFlagsBits } = require('discord.js');
const { warnsDB } = require('../../utils/db');

module.exports = {
  name: 'clearwarns',
  alias: ['borrarwarns', 'cw'],
  description: 'Borra todas las advertencias de un usuario',

  async execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers))
      return message.channel.send('No tienes permisos!');

    const user = message.mentions.members.first();
    if (!user) return message.channel.send('Menciona al usuario al que quieres borrar las advertencias.');

    const key = `${message.guild.id}.${user.id}`;
    await warnsDB.delete(key);
    message.channel.send(`Las advertencias de **${user.displayName}** han sido borradas.`);
  },
};
