const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { warnsDB } = require('../../utils/db');
const config = require('../../config');

module.exports = {
  name: 'warn',
  alias: ['advertir'],
  description: 'Advierte a un usuario y guarda el registro',
  category: 'admin',
  options: [
    { name: 'usuario', type: 'USER',   required: true, description: 'Usuario a advertir' },
    { name: 'razon',   type: 'STRING', required: true, description: 'Razón', rest: true },
  ],

  async run(ctx) {
    const err = t => ctx.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setDescription(t)] });

    if (!ctx.member.permissions.has(PermissionFlagsBits.ModerateMembers)) return err('No tienes permisos!');

    const user = ctx.args.usuario;
    if (!user) return err('Debes mencionar a alguien!');
    if (user.id === ctx.user.id) return err('No te puedes advertir a ti mismo');
    if (ctx.member.roles.highest.comparePositionTo(user.roles.highest) <= 0)
      return err('No puedes advertir a alguien superior a ti');

    const reason = ctx.args.razon;
    if (!reason) return err('Debes escribir una razón!');

    const key   = `${ctx.guild.id}.${user.id}`;
    const warns = (await warnsDB.get(key)) ?? [];
    warns.push({ reason, mod: ctx.user.id, date: Date.now() });
    await warnsDB.set(key, warns);

    const embed = new EmbedBuilder()
      .setTitle(`⚠️ ${user.displayName} fue advertido`)
      .setColor(0xFFA500)
      .addFields(
        { name: 'Razón',        value: reason,                     inline: true },
        { name: 'Moderador',    value: `${ctx.user}`,              inline: true },
        { name: 'Advertencias', value: `${warns.length} en total`, inline: true },
      )
      .setTimestamp();

    ctx.reply({ embeds: [embed] });
    if (config.channels.warnLog) ctx.client.channels.cache.get(config.channels.warnLog)?.send({ embeds: [embed] });
    user.user.send(`Has recibido una advertencia en **${ctx.guild.name}**: ${reason}`).catch(() => null);
  },
};
