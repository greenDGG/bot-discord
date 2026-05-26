const tresenraya = require('tresenraya');

module.exports = {
  name: '3enrayas',
  alias: ['3r', 'tictactoe'],
  description: 'Juega Tres en Raya contra otro usuario',
  category: 'games',
  options: [
    { name: 'rival', type: 'USER', required: true, description: 'Usuario contrincante' },
  ],

  async run(ctx) {
    const opponent = ctx.args.rival;
    if (!opponent) return ctx.reply('Menciona a un rival');
    if (opponent.id === ctx.user.id) return ctx.reply('No puedes jugar contigo mismo');

    await ctx.channel.send(`${ctx.guild.members.cache.get(opponent.id)} te han retado a jugar :fire:\n**Sí / No** para aceptar`);

    const partida = new tresenraya.partida({ jugadores: [ctx.user.id, opponent.id] });

    partida.on('ganador', (jugador, tablero, paso) => {
      const winner = ctx.client.users.cache.get(jugador)?.username ?? jugador;
      const loser  = ctx.client.users.cache.get(partida.perdedor)?.username ?? partida.perdedor;
      ctx.channel.send(`¡Ha ganado **${winner}** en ${paso} pasos!\n\n${tablero.string}\n\nLo siento, **${loser}** 😦`);
    });

    partida.on('empate', (jugadores, tablero) => {
      const names = jugadores.map(x => ctx.client.users.cache.get(x)?.username ?? x).join(' y ');
      ctx.channel.send(`¡Empate entre ${names}!\n\n${tablero.string}`);
    });

    ctx.channel.send(
      `Empieza **${ctx.client.users.cache.get(partida.turno.jugador)?.username}** [\`${partida.turno.ficha}\`]\n\n${partida.tablero.string}`
    );

    const collector = ctx.channel.createMessageCollector({
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
      ctx.channel.send(
        `Turno de **${ctx.client.users.cache.get(partida.turno.jugador)?.username}** [\`${partida.turno.ficha}\`]\n\n${partida.tablero.string}`
      );
    });
  },
};
