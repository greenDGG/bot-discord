const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  alias: [],
  description: 'Muestra el ping del bot',
  options: [],

  async run(ctx) {
    ctx.reply({ embeds: [new EmbedBuilder()
      .setColor(0x0008ff)
      .setDescription(`=== ========= ===\n   :ping_pong: **Pong**\n Tu ping es de.. - ${ctx.client.ws.ping}ms\n=== ========= ===`)] });
  },
};
