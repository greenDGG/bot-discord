const { EmbedBuilder } = require('discord.js');
const { levelsDB } = require('../../utils/db');
const { xpParaSiguienteNivel } = require('../../utils/levels');

module.exports = {
  name: 'level',
  alias: ['nivel', 'xp'],
  description: 'Muestra el nivel y XP de un usuario',
  category: 'general',
  options: [
    { name: 'usuario', type: 'USER', required: false, description: 'Usuario (deja vacío para verte a ti)' },
  ],

  async run(ctx) {
    const member = ctx.args.usuario || ctx.member;
    const key    = `${ctx.guild.id}.${member.id}`;
    const data   = await levelsDB.get(key);

    if (!data) return ctx.reply(`❌ ${member.id === ctx.user.id ? 'No tienes' : `${member} no tiene`} XP aún.`);

    const { xp, nivel } = data;
    const xpNecesario   = xpParaSiguienteNivel(nivel);
    const progreso      = Math.floor((xp / xpNecesario) * 20);
    const barra         = `${'█'.repeat(progreso)}${'░'.repeat(20 - progreso)}`;

    const embed = new EmbedBuilder()
      .setColor(member.displayHexColor !== '#000000' ? member.displayHexColor : 0x8a00ff)
      .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL() })
      .setTitle('📊 Estadísticas de nivel')
      .addFields(
        { name: '🚀 Nivel',  value: `${nivel}`,                    inline: true },
        { name: '✨ XP',     value: `${xp} / ${xpNecesario}`,      inline: true },
        { name: '🎯 Falta',  value: `${xpNecesario - xp} XP`,      inline: true },
        { name: '📈 Progreso', value: `\`${barra}\` ${Math.floor((xp / xpNecesario) * 100)}%` },
      )
      .setFooter({ text: `Próximo nivel: ${nivel + 1}` })
      .setTimestamp();

    ctx.reply({ embeds: [embed] });
  },
};
