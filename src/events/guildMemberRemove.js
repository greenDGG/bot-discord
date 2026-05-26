const { configDB } = require('../utils/db');
const config = require('../config');

module.exports = {
  name: 'guildMemberRemove',

  async execute(client, member) {
    const channels  = await configDB.get(`channels_${member.guild.id}`) ?? {};
    const channelId = channels.welcome || config.channels.goodbye;
    if (!channelId) return;
    client.channels.cache.get(channelId)?.send(
      `**${member.user.username}** ha dejado el servidor 😔`
    );
  },
};
