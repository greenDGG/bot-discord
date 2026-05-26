const { EmbedBuilder } = require('discord.js');
const { levelsDB } = require('../../utils/db');

module.exports = {
  name: 'level',
  alias: ['nivel'],
  description: 'Muestra el nivel y XP de un usuario',
  category: 'general',
  options: [
    { name: 'usuario', type: 'USER', required: false, description: 'Usuario (deja vacío para verte a ti)' },
  ],

  async run(ctx) {
    const usuario = ctx.args.usuario || ctx.member;
    const key  = `${ctx.guild.id}.${usuario.id}`;
    const data = await levelsDB.get(key);

    if (!data) return ctx.reply('Este usuario no tiene XP ni nivel aún');

    const { xp, nivel } = data;
    const levelUp = 5 * (nivel ** 2) + 50 * nivel + 100;

    ctx.reply({ embeds: [new EmbedBuilder()
      .setThumbnail(usuario.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`Nivel del usuario ${usuario}\nXP: ${xp}/${levelUp}\nNivel: ${nivel}`)
      .setColor(0x0000ff)] });
  },
};
