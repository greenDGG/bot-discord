const { EmbedBuilder } = require('discord.js');
const { levelsDB, configDB } = require('./db');
const config = require('../config');

const cooldown = new Set();

function xpParaSiguienteNivel(nivel) {
  return 5 * (nivel ** 2) + 50 * nivel + 100;
}

async function nivelesFunc(client, message) {
  if (!message.guild) return;
  if (cooldown.has(message.author.id)) return;
  if (message.content.length <= 5) return;

  cooldown.add(message.author.id);
  setTimeout(() => cooldown.delete(message.author.id), 30000);

  const key         = `${message.guild.id}.${message.author.id}`;
  const data        = await levelsDB.get(key) ?? { xp: 0, nivel: 1 };
  const xpGanado    = Math.floor(Math.random() * 30) + 1;
  const xpNecesario = xpParaSiguienteNivel(data.nivel);

  if (data.xp + xpGanado >= xpNecesario) {
    const nuevoNivel = data.nivel + 1;
    await levelsDB.set(key, { xp: 0, nivel: nuevoNivel });

    const channels = await configDB.get(`channels_${message.guild.id}`) ?? {};
    const msgs     = await configDB.get(`messages_${message.guild.id}`) ?? {};

    const channelId = channels.levelup || config.channels.levelUp;
    const canal     = channelId
      ? client.channels.cache.get(channelId)
      : message.channel;

    const descripcion = (msgs.level ?? '{user} ha alcanzado el **nivel {nivel}**')
      .replace(/{user}/g,           `${message.member}`)
      .replace(/{username}/g,       message.author.username)
      .replace(/{nivel}/g,          nuevoNivel)
      .replace(/{nivel_anterior}/g, data.nivel)
      .replace(/{xp_siguiente}/g,   xpParaSiguienteNivel(nuevoNivel));

    const embed = new EmbedBuilder()
      .setColor(0x8a00ff)
      .setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
      .setTitle('🎉 ¡Subiste de nivel!')
      .setDescription(descripcion)
      .addFields(
        { name: '⭐ Nivel anterior', value: `${data.nivel}`,                          inline: true },
        { name: '🚀 Nivel actual',   value: `${nuevoNivel}`,                          inline: true },
        { name: '✨ Próximo nivel',   value: `${xpParaSiguienteNivel(nuevoNivel)} XP`, inline: true },
      )
      .setTimestamp();

    canal?.send({ embeds: [embed] });
  } else {
    await levelsDB.set(key, { xp: data.xp + xpGanado, nivel: data.nivel });
  }
}

module.exports = { nivelesFunc, xpParaSiguienteNivel };
