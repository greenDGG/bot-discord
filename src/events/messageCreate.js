const { PermissionFlagsBits } = require('discord.js');
const { prefixDB } = require('../utils/db');
const { nivelesFunc } = require('../utils/levels');
const config = require('../config');

const saludos = [
  'Hola', 'Hola ¿cómo estás?', 'Holis 😁', '¡HOLA!', 'Hi', '¡Qué tal!',
  'Buenos días', 'Buenas tardes', 'Buenas noches', '¡Hola gente!', 'Hellou',
];

async function autoDelete(msg, ms = 5000) {
  setTimeout(() => msg.delete().catch(() => null), ms);
}

module.exports = {
  name: 'messageCreate',

  async execute(client, message) {
    if (!message.guild || message.author.bot) return;

    const prefix = await prefixDB.get(`prefix_${message.guild.id}`) ?? config.prefix;

    // Respuesta al ser mencionado
    if (message.content.match(new RegExp(`^<@!?${client.user.id}>\\s*$`))) {
      return message.channel.send(
        `**Hola! Soy ${client.user.username}. Mi prefix es \`${prefix}\`\nEscribe \`${prefix}help\` para ver los comandos.**`,
      );
    }

    // Sistema de niveles
    nivelesFunc(client, message);

    // Saludo
    if (/^hola\b/i.test(message.content)) {
      return message.channel.send(saludos[Math.floor(Math.random() * saludos.length)]);
    }

    // Anti-enlaces
    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {
      if (/https?:\/\//.test(message.content)) {
        await message.delete().catch(() => null);
        const warn = await message.channel.send('❌ No puedes enviar enlaces.');
        return autoDelete(warn);
      }
      if (message.content.includes('discord.gg')) {
        await message.delete().catch(() => null);
        const warn = await message.channel.send('❌ No puedes enviar invitaciones de otros servidores.');
        return autoDelete(warn);
      }
    }

    if (!message.content.startsWith(prefix)) return;

    const args    = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();
    const cmd     = client.commands.find(
      c => c.name === cmdName || (c.alias && c.alias.includes(cmdName)),
    );

    if (cmd) {
      try {
        cmd.execute(client, message, args);
      } catch (err) {
        console.error(`[Command: ${cmdName}]`, err);
      }
    }
  },
};
