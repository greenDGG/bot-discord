const tresenraya = require('tresenraya');

module.exports = {
  name: '3enrayas',
  alias: ['3r', 'tictactoe'],
  description: 'Juega Tres en Raya contra otro usuario',

  async execute(client, message, args) {
    const opponent = message.mentions.users.first();
    if (!opponent) return message.channel.send('Menciona a un rival');
    if (opponent.id === message.author.id) return message.channel.send('No puedes jugar contigo mismo');

    await message.channel.send(`${message.guild.members.cache.get(opponent.id)} te han retado a jugar :fire:\n**Sí / No** para aceptar`);

    const partida = new tresenraya.partida({ jugadores: [message.author.id, opponent.id] });

    partida.on('ganador', (jugador, tablero, paso) => {
      const winner = client.users.cache.get(jugador)?.username ?? jugador;
      const loser  = client.users.cache.get(partida.perdedor)?.username ?? partida.perdedor;
      message.channel.send(`¡Ha ganado **${winner}** en ${paso} pasos!\n\n${tablero.string}\n\nLo siento, **${loser}** 😦`);
    });

    partida.on('empate', (jugadores, tablero) => {
      const names = jugadores.map(x => client.users.cache.get(x)?.username ?? x).join(' y ');
      message.channel.send(`¡Empate entre ${names}!\n\n${tablero.string}`);
    });

    message.channel.send(
      `Empieza **${client.users.cache.get(partida.turno.jugador)?.username}** [\`${partida.turno.ficha}\`]\n\n${partida.tablero.string}`
    );

    const collector = message.channel.createMessageCollector({
      filter: msg =>
        msg.author.id === partida.turno.jugador &&
        !isNaN(msg.content) &&
        Number(msg.content) >= 1 &&
        Number(msg.content) <= 9 &&
        partida.disponible(msg.content) &&
        !partida.finalizado,
      time: 120000,
    });

    collector.on('collect', msg => {
      partida.elegir(msg.content);
      if (partida.finalizado) return collector.stop();
      message.channel.send(
        `Turno de **${client.users.cache.get(partida.turno.jugador)?.username}** [\`${partida.turno.ficha}\`]\n\n${partida.tablero.string}`
      );
    });
  },
};
