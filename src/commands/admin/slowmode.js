const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'slowmode',
  alias: ['sm', 'lento'],
  description: 'Configura el modo lento del canal (en segundos, 0 para desactivar)',

  async execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return message.channel.send('No tienes permisos para gestionar canales.');

    const seconds = parseInt(args[0]);
    if (isNaN(seconds) || seconds < 0 || seconds > 21600)
      return message.channel.send('Indica un número de segundos válido (0 - 21600).');

    await message.channel.setRateLimitPerUser(seconds);

    if (seconds === 0) return message.channel.send('⏱️ Modo lento desactivado.');
    message.channel.send(`⏱️ Modo lento configurado a **${seconds}s** por mensaje.`);
  },
};
