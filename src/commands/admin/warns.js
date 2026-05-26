const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { warnsDB } = require('../../utils/db');

module.exports = {
  name: 'warns',
  alias: ['advertencias'],
  description: 'Muestra las advertencias de un usuario',

  async execute(client, message, args) {
    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers))
      return message.channel.send('No tienes permisos!');

    const user = message.mentions.members.first() || message.member;
    const key = `${message.guild.id}.${user.id}`;
    const warns = (await warnsDB.get(key)) ?? [];

    if (!warns.length)
      return message.channel.send(`**${user.displayName}** no tiene advertencias.`);

    const list = warns.map((w, i) => {
      const date = new Date(w.date).toLocaleDateString('es-ES');
      return `**${i + 1}.** ${w.reason} — <@${w.mod}> (${date})`;
    }).join('\n');

    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle(`⚠️ Advertencias de ${user.displayName}`)
      .setDescription(list)
      .setColor(0xFFA500)
      .setFooter({ text: `${warns.length} advertencia(s) en total` })] });
  },
};
