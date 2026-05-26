const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

const units = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };

function parseDuration(str) {
  const match = str?.match(/^(\d+)(s|m|h|d)$/i);
  if (!match) return null;
  const ms = parseInt(match[1]) * units[match[2].toLowerCase()];
  return ms > 0 && ms <= 28 * 86_400_000 ? ms : null;
}

module.exports = {
  name: 'timeout',
  alias: ['silenciar', 'to'],
  description: 'Aplica un timeout nativo a un usuario (ej: 10m, 1h, 1d)',
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Silencia a un usuario por un tiempo determinado')
    .addUserOption(o => o.setName('usuario').setDescription('Usuario').setRequired(true))
    .addStringOption(o => o.setName('duracion').setDescription('Duración: 10s, 5m, 1h, 1d (máx 28d)').setRequired(true))
    .addStringOption(o => o.setName('razon').setDescription('Razón').setRequired(false)),

  async execute(client, message, args) {
    const err = t => message.channel.send({ embeds: [new EmbedBuilder().setColor(0xFF0000).setDescription(t)] });

    if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) return err('No tienes permisos!');
    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) return err('No tengo permisos para aplicar timeouts!');

    const user = message.mentions.members.first();
    if (!user) return err('Debes mencionar a alguien!');
    if (user.id === message.author.id) return err('No puedes silenciarte a ti mismo.');
    if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return err('No puedes silenciar a alguien superior a ti.');

    const durStr = args[1];
    const ms = parseDuration(durStr);
    if (!ms) return err('Duración inválida. Usa: `10s`, `5m`, `1h`, `1d` (máx 28d)');

    const reason = args.slice(2).join(' ') || 'Sin razón';
    await user.timeout(ms, reason);

    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle(`🔇 Timeout aplicado`)
      .setColor(0xFFA500)
      .addFields(
        { name: 'Usuario',   value: `${user}`,      inline: true },
        { name: 'Duración',  value: durStr,          inline: true },
        { name: 'Razón',     value: reason,          inline: true },
      )
      .setTimestamp()] });
  },

  async slash(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return interaction.reply({ content: 'No tienes permisos!', ephemeral: true });

    const user    = interaction.options.getMember('usuario');
    const durStr  = interaction.options.getString('duracion');
    const reason  = interaction.options.getString('razon') ?? 'Sin razón';
    const ms      = parseDuration(durStr);

    if (!ms) return interaction.reply({ content: 'Duración inválida. Usa: `10s`, `5m`, `1h`, `1d`', ephemeral: true });

    await user.timeout(ms, reason);
    interaction.reply({ embeds: [new EmbedBuilder()
      .setTitle('🔇 Timeout aplicado')
      .setColor(0xFFA500)
      .addFields(
        { name: 'Usuario',  value: `${user}`,  inline: true },
        { name: 'Duración', value: durStr,      inline: true },
        { name: 'Razón',    value: reason,      inline: true },
      )
      .setTimestamp()] });
  },
};
