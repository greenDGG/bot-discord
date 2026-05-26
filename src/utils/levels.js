const { levelsDB } = require('./db');
const config = require('../config');

const cooldown = new Set();

async function nivelesFunc(client, message) {
  if (!message.guild) return;
  if (cooldown.has(message.author.id)) return;
  if (message.content.length <= 5) return;

  cooldown.add(message.author.id);
  setTimeout(() => cooldown.delete(message.author.id), 30000);

  const key = `${message.guild.id}.${message.author.id}`;
  const data = await levelsDB.get(key) ?? { xp: 0, nivel: 1 };
  const randomXp = Math.floor(Math.random() * 30) + 1;
  const levelUp = 5 * (data.nivel ** 2) + 50 * data.nivel + 100;

  if (data.xp + randomXp >= levelUp) {
    await levelsDB.set(key, { xp: 0, nivel: data.nivel + 1 });
    if (config.channels.levelUp) {
      client.channels.cache.get(config.channels.levelUp)?.send(
        `${message.member} acabas de subir al nivel ${data.nivel + 1}!`
      );
    }
  } else {
    await levelsDB.set(key, { xp: data.xp + randomXp, nivel: data.nivel });
  }
}

module.exports = { nivelesFunc };
