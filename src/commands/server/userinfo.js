const { EmbedBuilder } = require('discord.js');

const statusMap = { online: 'Online', dnd: 'No Molestar', idle: 'Ausente', offline: 'OffLine' };

module.exports = {
  name: 'userinfo',
  alias: ['uinfo'],
  description: 'Muestra información de un usuario',

  execute(client, message, args) {
    const user   = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const status = statusMap[user.presence?.status] ?? 'Desconocido';

    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle(`Información de ${user.user.username}`)
      .setColor(0x8a00ff)
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
      .setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL() })
      .addFields(
        { name: 'Nombre',            value: user.user.username, inline: true },
        { name: 'ID',                value: user.user.id, inline: true },
        { name: 'Estado',            value: status, inline: true },
        { name: 'Cuenta creada',     value: user.user.createdAt.toLocaleDateString('en-us'), inline: true },
        { name: 'Ingresó al server', value: user.joinedAt?.toLocaleDateString('es-es') ?? '—', inline: true },
        { name: 'Roles',             value: user.roles.cache.map(r => r.toString()).join(', ').slice(0, 1024) || 'Sin roles' },
      )] });
    message.delete().catch(() => null);
  },
};
