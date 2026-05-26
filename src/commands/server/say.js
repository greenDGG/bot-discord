const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'say',
  alias: [],
  description: 'Hace que el bot repita un mensaje',
  category: 'server',
  options: [
    { name: 'texto', type: 'STRING', required: true, description: 'Texto a repetir', rest: true },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return ctx.reply('No tienes permisos para usar este comando');

    const text = ctx.args.texto;
    if (!text) return ctx.reply('Escribe un texto');

    ctx.message?.delete().catch(() => null);
    ctx.channel.send(text);
  },
};
