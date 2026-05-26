const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');

module.exports = {
  name: 'coinflip',
  alias: ['cf', 'moneda'],
  description: 'Apuesta a cara o cruz (coinflip <cara|cruz> <cantidad>)',
  category: 'casino',
  options: [
    { name: 'eleccion', type: 'STRING', required: true,  description: 'cara o cruz' },
    { name: 'apuesta',  type: 'STRING', required: true,  description: 'Cantidad a apostar (o "all")' },
  ],

  async run(ctx) {
    const err = t => ctx.reply({ embeds: [new EmbedBuilder().setColor(0xFF4444).setDescription(t)] });

    const choice = ctx.args.eleccion?.toLowerCase();
    if (!['cara', 'cruz'].includes(choice))
      return err('Elige **cara** o **cruz**. Ej: `coinflip cara 500`');

    const key    = `${ctx.guild.id}.${ctx.user.id}`;
    const dinero = (await db.get(`${key}.dinero`)) ?? 0;
    const bet    = ctx.args.apuesta?.toLowerCase() === 'all' ? dinero : parseInt(ctx.args.apuesta);

    if (isNaN(bet) || bet < eco.coinflip.minBet)
      return err(`Apuesta mínima: ${eco.fmt(eco.coinflip.minBet)}`);
    if (bet > dinero)
      return err(`No tienes suficiente. Tienes ${eco.fmt(dinero)} en mano.`);

    const result = Math.random() < 0.5 ? 'cara' : 'cruz';
    const win    = choice === result;

    if (win) {
      await db.add(`${key}.dinero`, bet);
      ctx.reply({ embeds: [new EmbedBuilder()
        .setTitle(`🪙 ¡${result.toUpperCase()}! — Ganaste`)
        .setDescription(`Apostaste **${choice}** y ganaste ${eco.fmt(bet)}`)
        .setColor(0x00CC66)] });
    } else {
      await db.sub(`${key}.dinero`, bet);
      ctx.reply({ embeds: [new EmbedBuilder()
        .setTitle(`🪙 ¡${result.toUpperCase()}! — Perdiste`)
        .setDescription(`Apostaste **${choice}** y perdiste ${eco.fmt(bet)}`)
        .setColor(0xFF4444)] });
    }
  },
};
