const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'unlock',
  alias: ['desbloquear'],
  description: 'Desbloquea el canal',

  async execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return message.channel.send('No tienes permisos para gestionar canales.');

    const everyone = message.guild.roles.everyone;
    await message.channel.permissionOverwrites.edit(everyone, { SendMessages: null });
    message.channel.send('🔓 Canal desbloqueado.');
  },
};
