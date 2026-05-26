const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'emoji',
  alias: [],
  description: 'Muestra un emoji del servidor en grande',

  execute(client, message, args) {
    if (!args[0]) return message.channel.send('Escribe el nombre de un emoji del servidor');
    const name  = args[0].replace(/:/g, '');
    const emoji = message.guild.emojis.cache.find(e => e.name.toLowerCase() === name.toLowerCase());
    if (!emoji) return message.channel.send(`No encontré el emoji \`${name}\` en este servidor`);
    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle(`:${emoji.name}:`)
      .setColor(0x0008ff)
      .setImage(`${emoji.url}?size=1024`)] });
  },
};
