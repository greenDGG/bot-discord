const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config');

module.exports = {
  name: 'ban',
  alias: ['banear'],
  description: 'Banea a un usuario del servidor',
  options: [
    { name: 'usuario', type: 'USER',   required: true,  description: 'Usuario a banear' },
    { name: 'razon',   type: 'STRING', required: true,  description: 'Razón del baneo', rest: true },
  ],

  async run(ctx) {
    const err = t => ctx.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setDescription(t)] });

    if (!ctx.guild.members.me.permissions.has(PermissionFlagsBits.BanMembers)) return err('No tengo suficientes permisos!');
    if (!ctx.member.permissions.has(PermissionFlagsBits.BanMembers)) return err('No tienes permisos para usar este comando!');

    const user = ctx.args.usuario;
    if (!user) return err('Debes mencionar a alguien!');
    if (user.id === ctx.user.id) return ctx.reply('No te puedes banear a ti mismo :rolling_eyes:');
    if (ctx.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return err('No puedes banear a alguien superior a ti');

    const reason = ctx.args.razon;
    if (!reason) return err('Debes escribir una razón!');

    await user.ban({ reason });
    if (config.channels.banLog) {
      ctx.client.channels.cache.get(config.channels.banLog)?.send({
        embeds: [new EmbedBuilder().setTitle(`[BAN] ${user.displayName}`).setColor(0xB40431).setDescription(`${user} fue **Baneado** por ${reason}`)]
      });
    }
    ctx.reply({ embeds: [new EmbedBuilder().setTitle(`[BAN] ${user.displayName}`).setColor(0xB40431).setDescription(`${user} fue baneado por ${reason}`)] });
  },
};
