const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { configDB } = require('../../utils/db');

const TYPES = {
  welcome:   {
    label: '👋 Bienvenida',
    vars:  '`{user}` `{username}` `{server}` `{membercount}`',
  },
  goodbye: {
    label: '🚪 Despedida',
    vars:  '`{user}` `{username}` `{server}` `{membercount}`',
  },
  level: {
    label: '🎉 Subida de nivel',
    vars:  '`{user}` `{username}` `{nivel}` `{nivel_anterior}` `{xp_siguiente}`',
  },
};

module.exports = {
  name: 'setmessage',
  alias: ['setmsg'],
  description: 'Configura los mensajes del bot (bienvenida, despedida, level)',
  category: 'admin',
  options: [
    { name: 'tipo',    type: 'STRING', required: false, description: 'welcome | despedida | level | ver', },
    { name: 'mensaje', type: 'STRING', required: false, description: 'Texto del mensaje con variables', rest: true },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return ctx.replyEphemeral('❌ Necesitas permisos de **Administrador**.');
    }

    const tipo    = ctx.args.tipo?.toLowerCase();
    const mensaje = ctx.args.mensaje;
    const msgs    = await configDB.get(`messages_${ctx.guild.id}`) ?? {};

    // Ver configuración actual
    if (!tipo || tipo === 'ver') {
      const fields = Object.entries(TYPES).map(([key, { label, vars }]) => ({
        name:  label,
        value: `**Mensaje:** ${msgs[key] ?? '`Por defecto`'}\n**Variables:** ${vars}`,
      }));

      return ctx.reply({ embeds: [
        new EmbedBuilder()
          .setColor(0x8a00ff)
          .setTitle('⚙️ Mensajes configurados')
          .addFields(fields)
          .setFooter({ text: 'Uso: !setmessage <tipo> <mensaje>' })
          .setTimestamp(),
      ]});
    }

    const type = TYPES[tipo];
    if (!type) {
      const lista = Object.keys(TYPES).map(k => `\`${k}\``).join(', ');
      return ctx.reply(`❌ Tipo inválido. Opciones: ${lista}`);
    }

    if (!mensaje) {
      return ctx.reply(`❌ Escribe el mensaje.\n**Variables disponibles:** ${type.vars}`);
    }

    msgs[tipo] = mensaje;
    await configDB.set(`messages_${ctx.guild.id}`, msgs);

    ctx.message?.delete().catch(() => null);
    ctx.channel.send({ embeds: [
      new EmbedBuilder()
        .setColor(0x00c851)
        .setTitle(`✅ ${type.label} actualizado`)
        .setDescription(`> ${mensaje}`)
        .addFields({ name: 'Variables disponibles', value: type.vars }),
    ]});
  },
};
