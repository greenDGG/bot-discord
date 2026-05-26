const { EmbedBuilder } = require('discord.js');
const { levelsDB } = require('../../utils/db');

module.exports = {
  name: 'level',
  alias: ['nivel'],
  description: 'Muestra el nivel y XP de un usuario',

  async execute(client, message, args) {
    const usuario = message.mentions.members.first() || message.member;
    const key = `${message.guild.id}.${usuario.id}`;
    const data = await levelsDB.get(key);

    if (!data) return message.channel.send('Este usuario no tiene XP ni nivel aún');

    const { xp, nivel } = data;
    const levelUp = 5 * (nivel ** 2) + 50 * nivel + 100;

    message.channel.send({ embeds: [new EmbedBuilder()
      .setThumbnail(usuario.user.displayAvatarURL({ dynamic: true }))
      .setDescription(`Nivel del usuario ${usuario}\nXP: ${xp}/${levelUp}\nNivel: ${nivel}`)
      .setColor(0x0000ff)] });
  },
};
