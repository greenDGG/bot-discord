const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'kick',
  alias: ['expulsar'],
  description: 'Expulsa a un usuario del servidor',
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulsa a un usuario')
    .addUserOption(o => o.setName('usuario').setDescription('Usuario a expulsar').setRequired(true))
    .addStringOption(o => o.setName('razon').setDescription('Razón').setRequired(true)),

  execute(client, message, args) {
    const err = t => message.channel.send({ embeds: [new EmbedBuilder().setColor(0xFF0000).setDescription(t)] });
    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.KickMembers)) return err('No tengo suficientes permisos!');
    if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)) return err('No tienes permisos!');
    const user = message.mentions.members.first();
    if (!user) return err('Debes mencionar a alguien!');
    if (user.id === message.author.id) return err('No te puedes expulsar a ti mismo :rolling_eyes:');
    if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return err('No puedes expulsar a alguien superior a ti');
    const reason = args.slice(1).join(' ');
    if (!reason) return err('Debes escribir una razón!');
    user.kick({ reason });
    message.channel.send({ embeds: [new EmbedBuilder().setTitle(`[KICK] ${user.displayName}`).setColor(0xFF8800).setDescription(`${user} fue **Expulsado** por ${reason}`)] });
  },

  async slash(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers))
      return interaction.reply({ content: 'No tienes permisos!', ephemeral: true });
    const user = interaction.options.getMember('usuario');
    const razon = interaction.options.getString('razon');
    if (!user) return interaction.reply({ content: 'Usuario no encontrado.', ephemeral: true });
    await user.kick({ reason: razon });
    interaction.reply({ embeds: [new EmbedBuilder().setTitle(`[KICK] ${user.displayName}`).setColor(0xFF8800).setDescription(`${user} fue expulsado por ${razon}`)] });
  },
};
