const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'unlock',
  alias: ['desbloquear'],
  description: 'Desbloquea el canal',
  options: [],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return ctx.reply('No tienes permisos para gestionar canales.');

    const everyone = ctx.guild.roles.everyone;
    await ctx.channel.permissionOverwrites.edit(everyone, { SendMessages: null });
    ctx.reply('🔓 Canal desbloqueado.');
  },
};
