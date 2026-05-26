const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { configDB } = require('../../utils/db');

const VARS = '`{user}` mención · `{username}` nombre · `{server}` servidor · `{membercount}` miembros';

module.exports = {
  name: 'setwelcome',
  alias: ['setwlc'],
  description: 'Configura los mensajes de bienvenida y despedida',
  category: 'admin',
  options: [
    { name: 'tipo',    type: 'STRING', required: false, description: 'bienvenida | despedida | ver' },
    { name: 'mensaje', type: 'STRING', required: false, description: 'Texto del mensaje. Variables: {user} {username} {server} {membercount}', rest: true },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return ctx.replyEphemeral('❌ Necesitas permisos de **Administrador**.');
    }

    const tipo    = ctx.args.tipo?.toLowerCase();
    const mensaje = ctx.args.mensaje;
    const guildId = ctx.guild.id;

    if (!tipo || tipo === 'ver') {
      const wMsg = await configDB.get(`welcome_msg_${guildId}`) ?? '`No configurado`';
      const gMsg = await configDB.get(`goodbye_msg_${guildId}`) ?? '`No configurado`';
      return ctx.reply({ embeds: [
        new EmbedBuilder()
          .setColor(0x8a00ff)
          .setTitle('⚙️ Mensajes de bienvenida/despedida')
          .addFields(
            { name: '👋 Bienvenida', value: wMsg },
            { name: '👋 Despedida',  value: gMsg },
            { name: '📌 Variables',  value: VARS },
          )
          .setFooter({ text: 'Configura el canal con !setchannel bienvenida/despedida #canal' }),
      ]});
    }

    if (!mensaje) {
      return ctx.reply(`❌ Escribe el mensaje. Variables disponibles:\n${VARS}`);
    }

    if (tipo === 'bienvenida') {
      await configDB.set(`welcome_msg_${guildId}`, mensaje);
      return ctx.reply({ embeds: [
        new EmbedBuilder().setColor(0x00c851)
          .setDescription(`✅ Mensaje de bienvenida guardado:\n> ${mensaje}`),
      ]});
    }

    if (tipo === 'despedida') {
      await configDB.set(`goodbye_msg_${guildId}`, mensaje);
      return ctx.reply({ embeds: [
        new EmbedBuilder().setColor(0x00c851)
          .setDescription(`✅ Mensaje de despedida guardado:\n> ${mensaje}`),
      ]});
    }

    ctx.reply('❌ Tipo inválido. Usa `bienvenida`, `despedida` o `ver`.');
  },
};
