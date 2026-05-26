const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const config = require('../../config');

module.exports = {
  name: 'ban',
  alias: ['banear'],
  description: 'Banea a un usuario del servidor',
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Banea a un usuario')
    .addUserOption(o => o.setName('usuario').setDescription('Usuario a banear').setRequired(true))
    .addStringOption(o => o.setName('razon').setDescription('Razón del baneo').setRequired(true)),

  execute(client, message, args) {
    const err = t => message.channel.send({ embeds: [new EmbedBuilder().setColor(0xFF0000).setDescription(t)] });

    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) return err('No tengo suficientes permisos!');
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) return err('No tienes permisos para usar este comando!');

    const user = message.mentions.members.first();
    if (!user) return err('Debes mencionar a alguien!');
    if (user.id === message.author.id) return message.channel.send('No te puedes banear a ti mismo :rolling_eyes:');
    if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return err('No puedes banear a alguien superior a ti');

    const reason = args.slice(1).join(' ');
    if (!reason) return err('Debes escribir una razón!');

    user.ban({ reason });
    if (config.channels.banLog) {
      client.channels.cache.get(config.channels.banLog)?.send({
        embeds: [new EmbedBuilder().setTitle(`[BAN] ${user.displayName}`).setColor(0xB40431).setDescription(`${user} fue **Baneado** por ${reason}`)]
      });
    }
    message.channel.send({ embeds: [new EmbedBuilder().setTitle(`[BAN] ${user.displayName}`).setColor(0xB40431).setDescription(`${user} fue baneado por ${reason}`)] });
  },

  async slash(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers))
      return interaction.reply({ content: 'No tienes permisos!', ephemeral: true });
    const user = interaction.options.getMember('usuario');
    const razon = interaction.options.getString('razon');
    if (!user) return interaction.reply({ content: 'Usuario no encontrado.', ephemeral: true });
    await user.ban({ reason: razon });
    interaction.reply({ embeds: [new EmbedBuilder().setTitle(`[BAN] ${user.displayName}`).setColor(0xB40431).setDescription(`${user} fue baneado por ${razon}`)] });
  },
};
