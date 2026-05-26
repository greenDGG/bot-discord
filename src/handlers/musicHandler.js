const { EmbedBuilder } = require('discord.js');

module.exports = (client) => {
  client.distube.on('playSong', (queue, song) => {
    const embed = new EmbedBuilder()
      .setDescription(`Reproduciendo ahora:\n**${song.name}**\nDuración: ${song.formattedDuration}`)
      .setColor(0x0008ff)
      .setThumbnail(song.thumbnail);
    queue.textChannel?.send({ embeds: [embed] });
  });

  client.distube.on('addSong', (queue, song) => {
    queue.textChannel?.send(`Canción añadida: **${song.name}** — ${song.formattedDuration}`);
  });

  client.distube.on('addList', (queue, playlist) => {
    queue.textChannel?.send(`Playlist añadida: **${playlist.name}** — ${playlist.songs.length} canciones`);
  });

  client.distube.on('error', (channel, error) => {
    console.error('[DisTube]', error);
    if (channel?.send) channel.send(`Error de música: ${error.message}`);
  });

  console.log('[MusicHandler] Eventos de DisTube registrados.');
};
