const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  alias: [],
  description: 'Muestra el ping del bot',
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Muestra el ping del bot'),

  execute(client, message, args) {
    message.channel.send({ embeds: [new EmbedBuilder()
      .setColor(0x0008ff)
      .setDescription(`=== ========= ===\n   :ping_pong: **Pong**\n Tu ping es de.. - ${client.ws.ping}ms\n=== ========= ===`)] });
  },

  async slash(interaction) {
    await interaction.reply({ embeds: [new EmbedBuilder()
      .setColor(0x0008ff)
      .setDescription(`=== ========= ===\n   :ping_pong: **Pong**\n Ping - ${interaction.client.ws.ping}ms\n=== ========= ===`)] });
  },
};
