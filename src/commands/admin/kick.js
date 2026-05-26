const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'kick',
  alias: ['expulsar'],
  description: 'Expulsa a un usuario del servidor',
  options: [
    { name: 'usuario', type: 'USER',   required: true, description: 'Usuario a expulsar' },
    { name: 'razon',   type: 'STRING', required: true, description: 'Razón', rest: true },
  ],

  async run(ctx) {
    const err = t => ctx.reply({ embeds: [new EmbedBuilder().setColor(0xFF0000).setDescription(t)] });

    if (!ctx.guild.members.me.permissions.has(PermissionFlagsBits.KickMembers)) return err('No tengo suficientes permisos!');
    if (!ctx.member.permissions.has(PermissionFlagsBits.KickMembers)) return err('No tienes permisos!');

    const user = ctx.args.usuario;
    if (!user) return err('Debes mencionar a alguien!');
    if (user.id === ctx.user.id) return err('No te puedes expulsar a ti mismo :rolling_eyes:');
    if (ctx.member.roles.highest.comparePositionTo(user.roles.highest) <= 0) return err('No puedes expulsar a alguien superior a ti');

    const reason = ctx.args.razon;
    if (!reason) return err('Debes escribir una razón!');

    await user.kick({ reason });
    ctx.reply({ embeds: [new EmbedBuilder().setTitle(`[KICK] ${user.displayName}`).setColor(0xFF8800).setDescription(`${user} fue **Expulsado** por ${reason}`)] });
  },
};
