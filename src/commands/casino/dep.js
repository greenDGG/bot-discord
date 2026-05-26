const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');

module.exports = {
  name: 'dep',
  alias: ['depositar', 'deposit'],
  description: 'Deposita dinero en el banco (dep <cantidad|all>)',

  async execute(client, message, args) {
    const key    = `${message.guild.id}.${message.author.id}`;
    const dinero = (await db.get(`${key}.dinero`)) ?? 0;
    const err    = t => message.channel.send({ embeds: [new EmbedBuilder().setColor(0xFF4444).setDescription(t)] });

    if (!args[0]) return err(`Indica una cantidad o escribe \`all\`.\nTienes ${eco.fmt(dinero)} en mano.`);

    const amount = args[0].toLowerCase() === 'all' ? dinero : parseInt(args[0]);
    if (isNaN(amount) || amount <= 0) return err('Escribe una cantidad válida.');
    if (amount > dinero) return err(`No tienes suficiente. Tienes ${eco.fmt(dinero)} en mano.`);

    await db.sub(`${key}.dinero`, amount);
    await db.add(`${key}.banco`,  amount);
    const banco = (await db.get(`${key}.banco`)) ?? 0;

    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle('🏦 Depósito realizado')
      .setColor(0x8a00ff)
      .addFields(
        { name: 'Depositado', value: eco.fmt(amount), inline: true },
        { name: 'Banco',      value: eco.fmt(banco),  inline: true },
      )] });
  },
};
