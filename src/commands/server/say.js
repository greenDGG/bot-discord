const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'say',
  alias: [],
  description: 'Hace que el bot repita un mensaje',

  execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return message.channel.send('No tienes permisos para usar este comando');
    const text = args.join(' ');
    if (!text) return message.channel.send('Escribe un texto');
    message.delete().catch(() => null);
    message.channel.send(text);
  },
};
