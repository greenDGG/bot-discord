module.exports = {
  name: 'cont',
  alias: [],
  description: 'Notifica al dueño del servidor',

  async execute(client, message, args) {
    message.delete().catch(() => null);
    const owner = await message.guild.fetchOwner().catch(() => null);
    owner?.send(`¡Te necesitan en **${message.guild.name}**! Entra rápido.`).catch(() => null);
  },
};
