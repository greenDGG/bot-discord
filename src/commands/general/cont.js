module.exports = {
  name: 'cont',
  alias: [],
  description: 'Notifica al dueño del servidor',
  options: [],

  async run(ctx) {
    ctx.message?.delete().catch(() => null);
    const owner = await ctx.guild.fetchOwner().catch(() => null);
    owner?.send(`¡Te necesitan en **${ctx.guild.name}**! Entra rápido.`).catch(() => null);
  },
};
