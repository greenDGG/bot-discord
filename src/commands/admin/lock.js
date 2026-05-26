const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'lock',
  alias: ['bloquear'],
  description: 'Bloquea el canal para que nadie pueda escribir',
  options: [],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.ManageChannels))
      return ctx.reply('No tienes permisos para gestionar canales.');

    const everyone = ctx.guild.roles.everyone;
    await ctx.channel.permissionOverwrites.edit(everyone, { SendMessages: false });
    ctx.reply('🔒 Canal bloqueado.');
  },
};
