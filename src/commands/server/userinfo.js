const { EmbedBuilder } = require('discord.js');

const statusMap = {
  online:  '🟢 En línea',
  dnd:     '🔴 No molestar',
  idle:    '🟡 Ausente',
  offline: '⚫ Desconectado',
};

module.exports = {
  name: 'userinfo',
  alias: ['uinfo'],
  description: 'Muestra información de un usuario',
  options: [
    { name: 'usuario', type: 'USER', required: false, description: 'Usuario (deja vacío para verte a ti)' },
  ],

  async run(ctx) {
    const member = ctx.args.usuario || ctx.member;
    const { user } = member;
    const status   = statusMap[member.presence?.status] ?? '❓ Desconocido';
    const roles    = member.roles.cache
      .filter(r => r.id !== ctx.guild.id)
      .sort((a, b) => b.position - a.position)
      .map(r => r.toString())
      .join(' ') || 'Sin roles';

    const createdAt = `<t:${Math.floor(user.createdTimestamp / 1000)}:D>`;
    const joinedAt  = member.joinedTimestamp
      ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:D>`
      : '—';
    const nickname  = member.nickname ?? '—';
    const isBot     = user.bot ? 'Sí' : 'No';
    const topRole   = member.roles.highest.id !== ctx.guild.id
      ? member.roles.highest.toString()
      : 'Sin rol';

    const embed = new EmbedBuilder()
      .setColor(member.displayHexColor !== '#000000' ? member.displayHexColor : 0x8a00ff)
      .setAuthor({ name: `Información de usuario`, iconURL: user.displayAvatarURL() })
      .setTitle(`${user.bot ? '🤖 ' : ''}${user.username}`)
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .addFields(
        { name: '👤 Nombre de usuario', value: user.username,          inline: true },
        { name: '🏷️ Apodo',             value: nickname,               inline: true },
        { name: '🆔 ID',                value: `\`${user.id}\``,       inline: true },
        { name: '📶 Estado',            value: status,                  inline: true },
        { name: '🤖 Bot',               value: isBot,                   inline: true },
        { name: '⭐ Rol principal',      value: topRole,                 inline: true },
        { name: '📅 Cuenta creada',      value: createdAt,               inline: true },
        { name: '📥 Ingresó al server',  value: joinedAt,                inline: true },
        { name: '​',               value: '​',                inline: true },
        { name: `📜 Roles (${member.roles.cache.size - 1})`, value: roles.slice(0, 1024) },
      )
      .setFooter({ text: `Solicitado por ${ctx.user.username}`, iconURL: ctx.user.displayAvatarURL() })
      .setTimestamp();

    ctx.message?.delete().catch(() => null);
    ctx.channel.send({ embeds: [embed] });
  },
};
