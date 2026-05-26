const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'untimeout',
  alias: ['desmute', 'uto'],
  description: 'Quita el timeout a un usuario',
  category: 'admin',
  options: [
    { name: 'usuario', type: 'USER', required: true, description: 'Usuario' },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.ModerateMembers))
      return ctx.reply('No tienes permisos!');

    const user = ctx.args.usuario;
    if (!user) return ctx.reply('Menciona al usuario al que quieres quitar el timeout.');
    if (!user.isCommunicationDisabled()) return ctx.reply('Ese usuario no tiene timeout activo.');

    await user.timeout(null);
    ctx.reply({ embeds: [new EmbedBuilder()
      .setDescription(`🔊 El timeout de **${user.displayName}** ha sido eliminado.`)
      .setColor(0x00CC66)] });
  },
};
