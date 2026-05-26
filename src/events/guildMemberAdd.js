const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'guildMemberAdd',

  async execute(client, member) {
    // Bienvenida
    if (config.channels.welcome) {
      client.channels.cache.get(config.channels.welcome)?.send(
        `Hey ${member.user}, ¡Bienvenido al servidor!`
      );
    }
    if (config.roles.welcome) {
      member.roles.add(config.roles.welcome).catch(() => null);
    }

    // Invite tracking (solo para el guild configurado)
    if (!process.env.GUILD_ID || member.guild.id !== process.env.GUILD_ID) return;
    if (!config.channels.inviteLog) return;

    const gInvites = await member.guild.invites.fetch().catch(() => null);
    if (!gInvites) return;

    const invite = gInvites.find(inv => {
      const old = client.invites?.get(inv.code);
      return old ? old.uses < inv.uses : false;
    });
    client.invites = gInvites;

    const embed = new EmbedBuilder().setDescription(
      `${member} entró al servidor.${invite ? ` Invitado por **${invite.inviter.tag}**.` : ''} Cuenta creada: ${member.user.createdAt.toLocaleDateString('en-us')}.`
    );
    client.channels.cache.get(config.channels.inviteLog)?.send({ embeds: [embed] });
  },
};
