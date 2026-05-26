const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'avatar',
  alias: ['av'],
  description: 'Muestra el avatar de un usuario',
  options: [
    { name: 'usuario', type: 'USER', required: false, description: 'Usuario (deja vacío para verte a ti)' },
  ],

  async run(ctx) {
    const target = ctx.args.usuario || ctx.member;
    ctx.reply({ embeds: [new EmbedBuilder()
      .setTitle(`Avatar de ${target.user.username}`)
      .setColor(0x0008ff)
      .setImage(target.user.displayAvatarURL({ size: 1024, dynamic: true }))] });
  },
};
