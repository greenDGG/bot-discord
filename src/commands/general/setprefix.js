const { PermissionFlagsBits } = require('discord.js');
const { prefixDB } = require('../../utils/db');

module.exports = {
  name: 'setprefix',
  alias: ['sp'],
  description: 'Cambia el prefijo del bot en este servidor',

  async execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator))
      return message.channel.send('No tienes permisos para cambiar el prefijo >:(');
    if (!args[0]) return message.channel.send('Debes indicar un nuevo prefijo');

    await prefixDB.set(`prefix_${message.guild.id}`, args[0]);

    const owner = await message.guild.fetchOwner().catch(() => null);
    owner?.send(`El prefijo ha sido cambiado a **${args[0]}**`).catch(() => null);

    message.channel.send(`El prefijo ha sido cambiado a **${args[0]}**`);
  },
};
