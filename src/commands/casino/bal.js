const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');
const config = require('../../config');

module.exports = {
  name: 'bal',
  alias: ['balance', 'saldo'],
  description: 'Muestra tu balance de dinero',

  async execute(client, message, args) {
    const target = message.mentions.members.first() || message.member;
    const key    = `${message.guild.id}.${target.id}`;
    const dinero = (await db.get(`${key}.dinero`)) ?? 0;
    const banco  = (await db.get(`${key}.banco`))  ?? 0;

    message.channel.send({ embeds: [new EmbedBuilder()
      .setAuthor({ name: target.displayName, iconURL: target.user.displayAvatarURL() })
      .setColor(0x8a00ff)
      .addFields(
        { name: '👜 En mano', value: eco.fmt(dinero), inline: true },
        { name: '🏦 Banco',   value: eco.fmt(banco),  inline: true },
        { name: '💰 Total',   value: eco.fmt(dinero + banco), inline: true },
      )
      .setFooter({ text: config.currency.name })] });
  },
};
