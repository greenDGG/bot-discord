const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'queue',
  alias: ['q', 'cola'],
  description: 'Muestra la cola de canciones',
  category: 'music',
  options: [],

  async run(ctx) {
    const queue = ctx.client.distube.getQueue(ctx.guild.id);
    if (!queue?.songs.length) return ctx.reply('❌ No hay música en cola.');

    const [current, ...next] = queue.songs;
    const preview = next.slice(0, 10);

    const embed = new EmbedBuilder()
      .setColor(0x8a00ff)
      .setTitle('🎵 Cola de canciones')
      .setDescription(
        `**Reproduciendo ahora:**\n[${current.name}](${current.url})\n` +
        `\`${queue.currentTime ? formatTime(queue.currentTime) : '0:00'} / ${current.formattedDuration}\` — pedido por ${current.member}`,
      );

    if (preview.length) {
      embed.addFields({
        name: `📋 Siguientes (${next.length} en cola)`,
        value: preview
          .map((s, i) => `\`${i + 1}.\` [${s.name}](${s.url}) \`${s.formattedDuration}\` — ${s.member}`)
          .join('\n')
          .slice(0, 1024),
      });
    }

    embed.setFooter({ text: `${queue.songs.length} canciones · Volumen: ${queue.volume}%${queue.repeatMode ? ' · 🔁 Repetición activa' : ''}` });

    ctx.reply({ embeds: [embed] });
  },
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
