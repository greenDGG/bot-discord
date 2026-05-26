const config = require('../config');

module.exports = {
  name: 'guildMemberRemove',

  execute(client, member) {
    if (!config.channels.goodbye) return;
    client.channels.cache.get(config.channels.goodbye)?.send(
      `**${member.user.username}** ha dejado el servidor 😔`
    );
  },
};
