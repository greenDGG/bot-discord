const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require('discord.js');
const { ticketDB } = require('../../utils/db');

module.exports = {
  name: 'ticket',
  alias: ['tsetup', 'ticketsetup'],
  description: 'Envía el panel de tickets en este canal (Admin)',
  category: 'server',
  options: [],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return ctx.replyEphemeral('❌ Necesitas permisos de **Administrador**.');
    }

    const embed = new EmbedBuilder()
      .setColor(0x8a00ff)
      .setTitle('🎫 Sistema de Tickets')
      .setDescription(
        '¿Tienes alguna duda, problema o quieres hablar con el staff?\n\n' +
        'Haz clic en **Abrir Ticket** y te crearemos un canal privado.\n' +
        'Un miembro del equipo te atenderá lo antes posible.',
      )
      .setThumbnail(ctx.guild.iconURL({ size: 256 }) ?? null)
      .setFooter({ text: ctx.guild.name, iconURL: ctx.guild.iconURL() ?? undefined })
      .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket_open')
        .setLabel('Abrir Ticket')
        .setEmoji('🎫')
        .setStyle(ButtonStyle.Primary),
    );

    const panel = await ctx.channel.send({ embeds: [embed], components: [row] });

    await ticketDB.set(`panel_${ctx.guild.id}`, {
      channelId: ctx.channel.id,
      messageId: panel.id,
    });

    ctx.message?.delete().catch(() => null);
  },
};
