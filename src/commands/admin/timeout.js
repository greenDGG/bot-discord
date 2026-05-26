const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

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
  category: 'admin',
  options: [
    { name: 'usuario',  type: 'USER',   required: true,  description: 'Usuario' },
    { name: 'duracion', type: 'STRING', required: true,  description: 'Duración: 10s, 5m, 1h, 1d (máx 28d)' },
    { name: 'razon',    type: 'STRING', required: false, description: 'Razón', rest: true },
  ],

  async run(ctx) {
    const err = t => ctx.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setDescription(t)] });

    if (!ctx.member.permissions.has(PermissionFlagsBits.ModerateMembers)) return err('No tienes permisos!');
    if (!ctx.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) return err('No tengo permisos para aplicar timeouts!');

    const user   = ctx.args.usuario;
    if (!user) return err('Debes mencionar a alguien!');
    if (user.id === ctx.user.id) return err('No puedes silenciarte a ti mismo.');
    if (ctx.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return err('No puedes silenciar a alguien superior a ti.');

    const durStr = ctx.args.duracion;
    const ms     = parseDuration(durStr);
    if (!ms) return err('Duración inválida. Usa: `10s`, `5m`, `1h`, `1d` (máx 28d)');

    const reason = ctx.args.razon || 'Sin razón';
    await user.timeout(ms, reason);

    ctx.reply({ embeds: [new EmbedBuilder()
      .setTitle(`🔇 Timeout aplicado`)
      .setColor(0xFFA500)
      .addFields(
        { name: 'Usuario',   value: `${user}`,  inline: true },
        { name: 'Duración',  value: durStr,      inline: true },
        { name: 'Razón',     value: reason,      inline: true },
      )
      .setTimestamp()] });
  },
};
