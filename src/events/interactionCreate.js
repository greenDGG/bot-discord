const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  PermissionFlagsBits,
} = require('discord.js');
const { ticketDB, configDB } = require('../utils/db');

module.exports = {
  name: 'interactionCreate',

  async execute(client, interaction) {
    // ── Slash commands ───────────────────────────────────────────────────────
    if (interaction.isChatInputCommand()) {
      const cmd = client.slashCommands.get(interaction.commandName);
      if (!cmd?.slash) return;
      try {
        await cmd.slash(interaction);
      } catch (err) {
        console.error(`[Slash: ${interaction.commandName}]`, err);
        const reply = { content: 'Hubo un error al ejecutar el comando.', ephemeral: true };
        interaction.replied ? interaction.followUp(reply) : interaction.reply(reply);
      }
      return;
    }

    // ── Botones ──────────────────────────────────────────────────────────────
    if (interaction.isButton()) {
      const { customId, guild, user } = interaction;

      // Abrir ticket
      if (customId === 'ticket_open') {
        const existing = guild.channels.cache.find(
          c => c.name === `ticket-${user.username.toLowerCase().replace(/\s+/g, '-')}`,
        );
        if (existing) {
          return interaction.reply({
            content: `Ya tienes un ticket abierto: ${existing}`,
            ephemeral: true,
          });
        }

        await interaction.deferReply({ ephemeral: true });

        const everyone  = guild.roles.everyone;
        const adminRole = guild.roles.cache.find(r =>
          r.permissions.has(PermissionFlagsBits.Administrator) && !r.managed,
        );

        const permOverwrites = [
          { id: everyone.id,  deny:  [PermissionFlagsBits.ViewChannel] },
          { id: user.id, allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ]},
        ];
        if (adminRole) {
          permOverwrites.push({ id: adminRole.id, allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.ReadMessageHistory,
          ]});
        }

        // Buscar categoría guardada (si se configuró)
        const channels = await configDB.get(`channels_${guild.id}`) ?? {};
        const options  = {
          name: `ticket-${user.username.toLowerCase().replace(/\s+/g, '-')}`,
          type: ChannelType.GuildText,
          permissionOverwrites: permOverwrites,
        };
        if (channels.ticketCategory) options.parent = channels.ticketCategory;

        const channel = await guild.channels.create(options);

        // Guardar ticket en DB
        await ticketDB.set(`ticket_${channel.id}`, { userId: user.id, guildId: guild.id });

        const embed = new EmbedBuilder()
          .setColor(0x8a00ff)
          .setTitle('🎫 Ticket de Soporte')
          .setDescription(
            `Hola ${user}, bienvenido a tu ticket.\n\n` +
            `Describe tu problema con detalle y el staff te atenderá pronto.\n` +
            `Cuando se resuelva usa **Cerrar Ticket**.`,
          )
          .addFields({ name: '👤 Abierto por', value: `${user} (\`${user.id}\`)`, inline: true })
          .setThumbnail(user.displayAvatarURL())
          .setFooter({ text: guild.name, iconURL: guild.iconURL() ?? undefined })
          .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('ticket_close')
            .setLabel('Cerrar Ticket')
            .setEmoji('🔒')
            .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId('ticket_claim')
            .setLabel('Reclamar')
            .setEmoji('✋')
            .setStyle(ButtonStyle.Secondary),
        );

        await channel.send({ content: `${user}`, embeds: [embed], components: [row] });
        await interaction.editReply({ content: `✅ Ticket creado: ${channel}` });
        return;
      }

      // Reclamar ticket (staff)
      if (customId === 'ticket_claim') {
        const data = await ticketDB.get(`ticket_${interaction.channel.id}`);
        if (!data) return interaction.reply({ content: 'No es un canal de ticket.', ephemeral: true });

        await ticketDB.set(`ticket_${interaction.channel.id}`, { ...data, claimedBy: user.id });

        const embed = new EmbedBuilder()
          .setColor(0x00c851)
          .setDescription(`✋ **${user.username}** ha reclamado este ticket y se encargará de ayudarte.`);

        await interaction.reply({ embeds: [embed] });

        // Deshabilitar el botón de reclamar
        const newRow = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('ticket_close')
            .setLabel('Cerrar Ticket')
            .setEmoji('🔒')
            .setStyle(ButtonStyle.Danger),
          new ButtonBuilder()
            .setCustomId('ticket_claim')
            .setLabel(`Reclamado por ${user.username}`)
            .setEmoji('✅')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
        );
        await interaction.message.edit({ components: [newRow] });
        return;
      }

      // Cerrar ticket
      if (customId === 'ticket_close') {
        const embed = new EmbedBuilder()
          .setColor(0xff4444)
          .setDescription('🔒 Cerrando ticket en **5 segundos**…');

        await interaction.reply({ embeds: [embed] });
        await ticketDB.delete(`ticket_${interaction.channel.id}`);
        setTimeout(() => interaction.channel.delete().catch(() => null), 5000);
        return;
      }
    }
  },
};
