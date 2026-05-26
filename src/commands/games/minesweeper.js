const emojis = ['||:zero:||', '||:one:||', '||:two:||', '||:three:||', '||:four:||',
  '||:five:||', '||:six:||', '||:seven:||', '||:eight:||', '||:bomb:||'];

module.exports = {
  name: 'buscaminas',
  alias: ['minesweeper'],
  description: 'Genera un tablero de buscaminas en Discord',
  options: [],

  async run(ctx) {
    const board = Array.from({ length: 10 }, () => Array(10).fill(0));
    let bombs   = 20;

    while (bombs > 0) {
      const r = Math.floor(Math.random() * 10);
      const c = Math.floor(Math.random() * 10);
      if (board[r][c] === 9) continue;
      board[r][c] = 9;
      bombs--;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < 10 && nc >= 0 && nc < 10 && board[nr][nc] !== 9) board[nr][nc]++;
        }
      }
    }

    ctx.reply(board.map(row => row.map(v => emojis[v]).join('')).join('\n'));
  },
};
