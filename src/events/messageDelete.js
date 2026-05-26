module.exports = {
  name: 'messageDelete',

  execute(client, message) {
    if (!message.guild || message.author?.bot) return;
    if (!message.content && !message.attachments.size) return;

    if (!client.sniped) client.sniped = new Map();

    client.sniped.set(message.channel.id, {
      content:   message.content,
      author:    message.author,
      image:     message.attachments.first()?.url ?? null,
      deletedAt: Date.now(),
    });
  },
};
