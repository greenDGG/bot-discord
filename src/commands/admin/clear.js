const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'clear',
  alias: ['limpiar'],
  description: 'Borra mensajes del canal',
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Borra mensajes del canal')
    .addIntegerOption(o => o.setName('cantidad').setDescription('Número de mensajes (1-100)').setRequired(true).setMinValue(1).setMaxValue(100)),

  async execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return message.channel.send('No tienes permisos para gestionar mensajes');
    const amount = parseInt(args[0]);
    if (!amount || isNaN(amount) || amount <= 0) return message.channel.send('Escribe un número válido mayor a 0');
    await message.channel.bulkDelete(amount, true);
    const msg = await message.channel.send(`**Se han borrado ${amount} mensajes correctamente**`);
    setTimeout(() => msg.delete().catch(() => null), 5000);
  },

  async slash(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return interaction.reply({ content: 'No tienes permisos!', ephemeral: true });
    const amount = interaction.options.getInteger('cantidad');
    await interaction.channel.bulkDelete(amount, true);
    interaction.reply({ content: `**Se han borrado ${amount} mensajes**`, ephemeral: true });
  },
};
