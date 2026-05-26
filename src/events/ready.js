const { ActivityType } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'ready',
  once: true,

  async execute(client) {
    console.log(`[Bot] Online como ${client.user.username} en ${client.guilds.cache.size} servidor(es)`);

    const typeMap = {
      Streaming: ActivityType.Streaming,
      Playing:   ActivityType.Playing,
      Watching:  ActivityType.Watching,
      Listening: ActivityType.Listening,
    };

    client.user.setPresence({
      status: config.presence.status,
      activities: [{
        name: config.presence.name,
        type: typeMap[config.presence.type] ?? ActivityType.Playing,
        url:  config.presence.url,
      }],
    });

    // Cache de invitaciones para todos los servidores
    for (const guild of client.guilds.cache.values()) {
      const invites = await guild.invites.fetch().catch(() => null);
      if (invites) {
        if (!client.invites) client.invites = new Map();
        invites.forEach(inv => client.invites.set(inv.code, inv));
      }
    }
    console.log(`[Bot] Cache de invitaciones lista.`);
  },
};
