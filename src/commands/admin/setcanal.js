const { EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const { configDB } = require('../../utils/db');

const TYPES = {
  sugerencias: { key: 'suggest',       label: '💡 Sugerencias',         needsCategory: false },
  tickets:     { key: 'ticketCategory', label: '🎫 Tickets (categoría)', needsCategory: true  },
  bienvenida:  { key: 'welcome',        label: '👋 Bienvenida',          needsCategory: false },
  logs:        { key: 'logs',           label: '📋 Logs',                needsCategory: false },
};

module.exports = {
  name: 'setchannel',
  alias: ['setcanal', 'setch'],
  description: 'Configura los canales del bot (Admin)',
  category: 'admin',
  options: [
    { name: 'tipo',  type: 'STRING',  required: false, description: 'Tipo de canal: sugerencias, tickets, bienvenida, logs (o "ver")' },
    { name: 'canal', type: 'CHANNEL', required: false, description: 'Canal o categoría a configurar' },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return ctx.replyEphemeral('❌ Necesitas permisos de **Administrador**.');
    }

    const channels = await configDB.get(`channels_${ctx.guild.id}`) ?? {};
    const tipoArg  = ctx.args.tipo;

    // !setchannel ver  — muestra configuración actual
    if (!tipoArg || tipoArg === 'ver') {
      const fields = Object.entries(TYPES).map(([, { key, label }]) => {
        const id  = channels[key];
        const val = id ? `<#${id}>` : '`No configurado`';
        return { name: label, value: val, inline: true };
      });

      return ctx.reply({ embeds: [
        new EmbedBuilder()
          .setColor(0x8a00ff)
          .setTitle('⚙️ Configuración de canales')
          .addFields(fields)
          .setFooter({ text: `Usa: !setchannel <tipo> #canal` })
          .setTimestamp(),
      ]});
    }

    const type = TYPES[tipoArg.toLowerCase()];
    if (!type) {
      const list = Object.keys(TYPES).map(k => `\`${k}\``).join(', ');
      return ctx.reply(`❌ Tipo inválido. Opciones: ${list}`);
    }

    const target = ctx.args.canal;
    if (!target) return ctx.reply('❌ Menciona o proporciona el ID del canal/categoría.');

    if (type.needsCategory && target.type !== ChannelType.GuildCategory) {
      return ctx.reply('❌ Para **tickets** necesitas mencionar una **categoría**, no un canal de texto.');
    }

    channels[type.key] = target.id;
    await configDB.set(`channels_${ctx.guild.id}`, channels);

    ctx.message?.delete().catch(() => null);
    ctx.channel.send({ embeds: [
      new EmbedBuilder()
        .setColor(0x00c851)
        .setDescription(`✅ ${type.label} configurado en ${target}.`),
    ]});
  },
};
