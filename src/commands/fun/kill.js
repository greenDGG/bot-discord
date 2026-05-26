const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'kill',
  alias: ['matar'],
  description: 'Mata a alguien (gif animado)',
  options: [
    { name: 'usuario', type: 'USER', required: true, description: 'Usuario a matar' },
  ],

  async run(ctx) {
    const user = ctx.args.usuario;
    if (!user) return ctx.reply('Menciona a alguien');
    try {
      const res  = await fetch('https://nekos.best/api/v2/kill');
      const data = await res.json();
      ctx.reply({ embeds: [new EmbedBuilder()
        .setTitle(`${ctx.user.username} mató a ${user.user.username} 💀`)
        .setColor(0x18CBDA)
        .setImage(data.results?.[0]?.url ?? null)] });
    } catch {
      ctx.reply(`${ctx.user} mató a ${user.user.username} 💀`);
    }
  },
};
