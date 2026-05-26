const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');
const cd  = require('../../utils/cooldown');

module.exports = {
  name: 'rob',
  alias: ['robar'],
  description: 'Intenta robar dinero en mano de otro usuario',

  async execute(client, message, args) {
    const err = t => message.channel.send({ embeds: [new EmbedBuilder().setColor(0xFF4444).setDescription(t)] });

    const target = message.mentions.members.first();
    if (!target) return err('Menciona al usuario al que quieres robar.');
    if (target.id === message.author.id) return err('No puedes robarte a ti mismo.');
    if (target.user.bot) return err('No puedes robar a un bot.');

    const remaining = cd.check(message.author.id, 'rob');
    if (remaining > 0) return err(`Espera **${remaining}s** antes de volver a intentar un robo.`);

    const robberKey = `${message.guild.id}.${message.author.id}`;
    const targetKey = `${message.guild.id}.${target.id}`;
    const targetDin = (await db.get(`${targetKey}.dinero`)) ?? 0;

    if (targetDin < eco.rob.minTarget)
      return err(`${target.displayName} no tiene suficiente dinero en mano para robar (mínimo ${eco.fmt(eco.rob.minTarget)}).`);

    cd.set(message.author.id, 'rob', eco.cooldowns.rob);

    if (Math.random() < eco.rob.successRate) {
      const stolen = Math.floor(targetDin * eco.rob.maxStealRate * Math.random() + targetDin * 0.05);
      await db.sub(`${targetKey}.dinero`, stolen);
      await db.add(`${robberKey}.dinero`, stolen);
      message.channel.send({ embeds: [new EmbedBuilder()
        .setTitle('🥷 Robo exitoso')
        .setDescription(`${message.author} robó ${eco.fmt(stolen)} a ${target}`)
        .setColor(0x00CC66)] });
    } else {
      const fine = eco.rand(eco.rob.fine.min, eco.rob.fine.max);
      const robberDin = (await db.get(`${robberKey}.dinero`)) ?? 0;
      await db.set(`${robberKey}.dinero`, Math.max(0, robberDin - fine));
      message.channel.send({ embeds: [new EmbedBuilder()
        .setTitle('🥷 Robo fallido')
        .setDescription(`${message.author} intentó robar a ${target} pero lo atraparon.\nPagó ${eco.fmt(fine)} de multa.`)
        .setColor(0xFF4444)] });
    }
  },
};
