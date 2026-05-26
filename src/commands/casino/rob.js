const { EmbedBuilder } = require('discord.js');
const { economyDB: db } = require('../../utils/db');
const eco = require('../../utils/economyConfig');
const cd  = require('../../utils/cooldown');

module.exports = {
  name: 'rob',
  alias: ['robar'],
  description: 'Intenta robar dinero en mano de otro usuario',
  category: 'casino',
  options: [
    { name: 'usuario', type: 'USER', required: true, description: 'Usuario al que robar' },
  ],

  async run(ctx) {
    const err = t => ctx.reply({ embeds: [new EmbedBuilder().setColor(0xFF4444).setDescription(t)] });

    const target = ctx.args.usuario;
    if (!target) return err('Menciona al usuario al que quieres robar.');
    if (target.id === ctx.user.id) return err('No puedes robarte a ti mismo.');
    if (target.user.bot) return err('No puedes robar a un bot.');

    const remaining = cd.check(ctx.user.id, 'rob');
    if (remaining > 0) return err(`Espera **${remaining}s** antes de volver a intentar un robo.`);

    const robberKey = `${ctx.guild.id}.${ctx.user.id}`;
    const targetKey = `${ctx.guild.id}.${target.id}`;
    const targetDin = (await db.get(`${targetKey}.dinero`)) ?? 0;

    if (targetDin < eco.rob.minTarget)
      return err(`${target.displayName} no tiene suficiente dinero en mano para robar (mínimo ${eco.fmt(eco.rob.minTarget)}).`);

    cd.set(ctx.user.id, 'rob', eco.cooldowns.rob);

    if (Math.random() < eco.rob.successRate) {
      const stolen = Math.floor(targetDin * eco.rob.maxStealRate * Math.random() + targetDin * 0.05);
      await db.sub(`${targetKey}.dinero`, stolen);
      await db.add(`${robberKey}.dinero`, stolen);
      ctx.reply({ embeds: [new EmbedBuilder()
        .setTitle('🥷 Robo exitoso')
        .setDescription(`${ctx.user} robó ${eco.fmt(stolen)} a ${target}`)
        .setColor(0x00CC66)] });
    } else {
      const fine      = eco.rand(eco.rob.fine.min, eco.rob.fine.max);
      const robberDin = (await db.get(`${robberKey}.dinero`)) ?? 0;
      await db.set(`${robberKey}.dinero`, Math.max(0, robberDin - fine));
      ctx.reply({ embeds: [new EmbedBuilder()
        .setTitle('🥷 Robo fallido')
        .setDescription(`${ctx.user} intentó robar a ${target} pero lo atraparon.\nPagó ${eco.fmt(fine)} de multa.`)
        .setColor(0xFF4444)] });
    }
  },
};
