const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'untimeout',
  alias: ['desmute', 'uto'],
  description: 'Quita el timeout a un usuario',
  data: new SlashCommandBuilder()
    .setName('untimeout')
    .setDescription('Quita el timeout a un usuario')
    .addUserOption(o => o.setName('usuario').setDescription('Usuario').setRequired(true)),

  async execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return message.channel.send('No tienes permisos!');

    const user = message.mentions.members.first();
    if (!user) return message.channel.send('Menciona al usuario al que quieres quitar el timeout.');
    if (!user.isCommunicationDisabled()) return message.channel.send('Ese usuario no tiene timeout activo.');

    await user.timeout(null);
    message.channel.send({ embeds: [new EmbedBuilder()
      .setDescription(`🔊 El timeout de **${user.displayName}** ha sido eliminado.`)
      .setColor(0x00CC66)] });
  },

  async slash(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return interaction.reply({ content: 'No tienes permisos!', ephemeral: true });

    const user = interaction.options.getMember('usuario');
    if (!user.isCommunicationDisabled())
      return interaction.reply({ content: 'Ese usuario no tiene timeout activo.', ephemeral: true });

    await user.timeout(null);
    interaction.reply({ embeds: [new EmbedBuilder()
      .setDescription(`🔊 El timeout de **${user.displayName}** ha sido eliminado.`)
      .setColor(0x00CC66)] });
  },
};
