const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');

function spin() {
  const { symbols } = eco.slots;
  return Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
}

module.exports = {
  name: 'slots',
  alias: ['slot', 'tragamonedas'],
  description: 'Gira el tragamonedas (slots <apuesta>)',
  category: 'casino',
  options: [
    { name: 'apuesta', type: 'STRING', required: true, description: 'Cantidad a apostar (o "all")' },
  ],

  async run(ctx) {
    const err = t => ctx.reply({ embeds: [new EmbedBuilder().setColor(0xFF4444).setDescription(t)] });

    const key    = `${ctx.guild.id}.${ctx.user.id}`;
    const dinero = (await db.get(`${key}.dinero`)) ?? 0;
    const raw    = ctx.args.apuesta;
    const bet    = raw?.toLowerCase() === 'all' ? dinero : parseInt(raw);

    if (isNaN(bet) || bet < eco.slots.minBet)
      return err(`Apuesta mínima: ${eco.fmt(eco.slots.minBet)}`);
    if (bet > dinero)
      return err(`No tienes suficiente. Tienes ${eco.fmt(dinero)} en mano.`);

    const [a, b, c] = spin();
    const display   = `[ ${a} | ${b} | ${c} ]`;

    let ganancia = 0;
    let resultado = '';

    if (a === b && b === c) {
      const multi = eco.slots.multipliers[a] ?? 1;
      ganancia = Math.floor(bet * multi);
      resultado = `🎉 **¡JACKPOT!** Los tres son **${a}** (x${multi})`;
    } else if (a === b || b === c || a === c) {
      ganancia = Math.floor(bet * eco.slots.twoMatchMultiplier);
      resultado = `✨ Dos iguales — recuperas la mitad`;
    } else {
      ganancia = -bet;
      resultado = `💸 Sin suerte esta vez`;
    }

    if (ganancia >= 0) {
      await db.add(`${key}.dinero`, ganancia);
    } else {
      await db.sub(`${key}.dinero`, bet);
    }

    const netStr = ganancia >= 0 ? `+${eco.fmt(ganancia)}` : `-${eco.fmt(bet)}`;

    ctx.reply({ embeds: [new EmbedBuilder()
      .setTitle('🎰 Tragamonedas')
      .setDescription(`${display}\n\n${resultado}\n${netStr}`)
      .setColor(ganancia >= 0 ? 0x00CC66 : 0xFF4444)
      .setFooter({ text: `Apuesta: ${bet.toLocaleString('es-ES')}` })] });
  },
};
