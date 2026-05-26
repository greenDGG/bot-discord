const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'emoji',
  alias: [],
  description: 'Muestra un emoji del servidor en grande',
  options: [
    { name: 'nombre', type: 'STRING', required: true, description: 'Nombre del emoji del servidor' },
  ],

  async run(ctx) {
    const name  = ctx.args.nombre?.replace(/:/g, '');
    if (!name) return ctx.reply('Escribe el nombre de un emoji del servidor');
    const emoji = ctx.guild.emojis.cache.find(e => e.name.toLowerCase() === name.toLowerCase());
    if (!emoji) return ctx.reply(`No encontré el emoji \`${name}\` en este servidor`);
    ctx.reply({ embeds: [new EmbedBuilder()
      .setTitle(`:${emoji.name}:`)
      .setColor(0x0008ff)
      .setImage(`${emoji.url}?size=1024`)] });
  },
};
