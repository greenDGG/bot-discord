const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { warnsDB } = require('../../utils/db');

module.exports = {
  name: 'warns',
  alias: ['advertencias'],
  description: 'Muestra las advertencias de un usuario',
  category: 'admin',
  options: [
    { name: 'usuario', type: 'USER', required: false, description: 'Usuario (deja vacío para verte a ti)' },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.BanMembers))
      return ctx.reply('No tienes permisos!');

    const user  = ctx.args.usuario || ctx.member;
    const key   = `${ctx.guild.id}.${user.id}`;
    const warns = (await warnsDB.get(key)) ?? [];

    if (!warns.length)
      return ctx.reply(`**${user.displayName}** no tiene advertencias.`);

    const list = warns.map((w, i) => {
      const date = new Date(w.date).toLocaleDateString('es-ES');
      return `**${i + 1}.** ${w.reason} — <@${w.mod}> (${date})`;
    }).join('\n');

    ctx.reply({ embeds: [new EmbedBuilder()
      .setTitle(`⚠️ Advertencias de ${user.displayName}`)
      .setDescription(list)
      .setColor(0xFFA500)
      .setFooter({ text: `${warns.length} advertencia(s) en total` })] });
  },
};
