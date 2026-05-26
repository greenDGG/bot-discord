const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'lock',
  alias: ['bloquear'],
  description: 'Bloquea el canal para que nadie pueda escribir',

  async execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return message.channel.send('No tienes permisos para gestionar canales.');

    const everyone = message.guild.roles.everyone;
    await message.channel.permissionOverwrites.edit(everyone, { SendMessages: false });
    message.channel.send('🔒 Canal bloqueado.');
  },
};
