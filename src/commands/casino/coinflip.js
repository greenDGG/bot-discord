const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');

module.exports = {
  name: 'coinflip',
  alias: ['cf', 'moneda'],
  description: 'Apuesta a cara o cruz (coinflip <cara|cruz> <cantidad>)',

  async execute(client, message, args) {
    const err = t => message.channel.send({ embeds: [new EmbedBuilder().setColor(0xFF4444).setDescription(t)] });

    const choice = args[0]?.toLowerCase();
    if (!['cara', 'cruz'].includes(choice))
      return err('Elige **cara** o **cruz**. Ej: `coinflip cara 500`');

    const key    = `${message.guild.id}.${message.author.id}`;
    const dinero = (await db.get(`${key}.dinero`)) ?? 0;
    const bet    = args[1]?.toLowerCase() === 'all' ? dinero : parseInt(args[1]);

    if (isNaN(bet) || bet < eco.coinflip.minBet)
      return err(`Apuesta mínima: ${eco.fmt(eco.coinflip.minBet)}`);
    if (bet > dinero)
      return err(`No tienes suficiente. Tienes ${eco.fmt(dinero)} en mano.`);

    const result = Math.random() < 0.5 ? 'cara' : 'cruz';
    const win    = choice === result;

    if (win) {
      await db.add(`${key}.dinero`, bet);
      message.channel.send({ embeds: [new EmbedBuilder()
        .setTitle(`🪙 ¡${result.toUpperCase()}! — Ganaste`)
        .setDescription(`Apostaste **${choice}** y ganaste ${eco.fmt(bet)}`)
        .setColor(0x00CC66)] });
    } else {
      await db.sub(`${key}.dinero`, bet);
      message.channel.send({ embeds: [new EmbedBuilder()
        .setTitle(`🪙 ¡${result.toUpperCase()}! — Perdiste`)
        .setDescription(`Apostaste **${choice}** y perdiste ${eco.fmt(bet)}`)
        .setColor(0xFF4444)] });
    }
  },
};
