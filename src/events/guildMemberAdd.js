const { EmbedBuilder } = require('discord.js');
const { configDB } = require('../utils/db');
const config = require('../config');

function parsear(template, member) {
  return template
    .replace(/{user}/g,        `${member}`)
    .replace(/{username}/g,    member.user.username)
    .replace(/{server}/g,      member.guild.name)
    .replace(/{membercount}/g, member.guild.memberCount);
}

module.exports = {
  name: 'guildMemberAdd',

  async execute(client, member) {
    const channels = await configDB.get(`channels_${member.guild.id}`) ?? {};
    const msgs     = await configDB.get(`messages_${member.guild.id}`) ?? {};

    // Bienvenida
    const welcomeId = channels.welcome || config.channels.welcome;
    if (welcomeId) {
      const canal = client.channels.cache.get(welcomeId);
      if (canal) {
        const texto = parsear(
          msgs.welcome ?? '¡Bienvenido al servidor, {user}!',
          member,
        );

        const embed = new EmbedBuilder()
          .setColor(0x8a00ff)
          .setTitle('👋 ¡Nuevo miembro!')
          .setDescription(texto)
          .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
          .addFields(
            { name: '📅 Cuenta creada', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true },
            { name: '👥 Miembro nº',    value: `${member.guild.memberCount}`,                              inline: true },
          )
          .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL() ?? undefined })
          .setTimestamp();

        canal.send({ embeds: [embed] });
      }
    }

    if (config.roles.welcome) {
      member.roles.add(config.roles.welcome).catch(() => null);
    }

    // Invite tracking
    const inviteLogId = channels.logs || config.channels.inviteLog;
    if (!inviteLogId) return;

    const gInvites = await member.guild.invites.fetch().catch(() => null);
    if (!gInvites) return;

    const invite = gInvites.find(inv => {
      const old = client.invites?.get(inv.code);
      return old ? old.uses < inv.uses : false;
    });
    client.invites = gInvites;

    const logEmbed = new EmbedBuilder()
      .setColor(0x8a00ff)
      .setDescription(
        `${member} entró al servidor.${invite ? ` Invitado por **${invite.inviter.username}**.` : ''}\n` +
        `Cuenta creada: <t:${Math.floor(member.user.createdTimestamp / 1000)}:D>`,
      );
    client.channels.cache.get(inviteLogId)?.send({ embeds: [logEmbed] });
  },
};
