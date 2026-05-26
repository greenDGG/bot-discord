const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');
const config = require('../../config');

module.exports = {
  name: 'bal',
  alias: ['balance', 'saldo'],
  description: 'Muestra tu balance de dinero',
  options: [
    { name: 'usuario', type: 'USER', required: false, description: 'Usuario (deja vacío para verte a ti)' },
  ],

  async run(ctx) {
    const target = ctx.args.usuario || ctx.member;
    const key    = `${ctx.guild.id}.${target.id}`;
    const dinero = (await db.get(`${key}.dinero`)) ?? 0;
    const banco  = (await db.get(`${key}.banco`))  ?? 0;

    ctx.reply({ embeds: [new EmbedBuilder()
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
