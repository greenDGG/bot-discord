const { EmbedBuilder } = require('discord.js');
const { configDB } = require('../utils/db');
const config = require('../config');

module.exports = {
  name: 'guildMemberAdd',

  async execute(client, member) {
    const channels = await configDB.get(`channels_${member.guild.id}`) ?? {};

    // Bienvenida
    const welcomeId = channels.welcome || config.channels.welcome;
    if (welcomeId) {
      client.channels.cache.get(welcomeId)?.send(
        `Hey ${member.user}, ¡Bienvenido al servidor!`
      );
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

    const embed = new EmbedBuilder()
      .setColor(0x8a00ff)
      .setDescription(
        `${member} entró al servidor.${invite ? ` Invitado por **${invite.inviter.username}**.` : ''}\n` +
        `Cuenta creada: <t:${Math.floor(member.user.createdTimestamp / 1000)}:D>`,
      );
    client.channels.cache.get(inviteLogId)?.send({ embeds: [embed] });
  },
};
