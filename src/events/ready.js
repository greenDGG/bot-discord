const { ActivityType } = require('discord.js');
const config = require('../config');

module.exports = {
  name: 'ready',
  once: true,

  async execute(client) {
    console.log(`[Bot] Online como ${client.user.tag}`);

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

    // Cache inicial de invitaciones para tracking
    const guildId = process.env.GUILD_ID;
    if (guildId) {
      const guild = client.guilds.cache.get(guildId);
      if (guild) {
        const inv = await guild.invites.fetch().catch(() => null);
        if (inv) client.invites = inv;
      }
    }
  },
};
