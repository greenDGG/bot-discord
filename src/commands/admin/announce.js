const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'announce',
  alias: ['anuncio', 'ann'],
  description: 'Envía un anuncio embed a un canal',
  category: 'admin',
  options: [
    { name: 'canal',   type: 'CHANNEL', required: true, description: 'Canal de destino' },
    { name: 'mensaje', type: 'STRING',  required: true, description: 'Contenido del anuncio', rest: true },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.Administrator))
      return ctx.replyEphemeral('❌ Necesitas permisos de **Administrador**.');

    const canal  = ctx.args.canal;
    const texto  = ctx.args.mensaje;

    const embed = new EmbedBuilder()
      .setColor(0x8a00ff)
      .setTitle('📢 Anuncio')
      .setDescription(texto)
      .setAuthor({ name: ctx.guild.name, iconURL: ctx.guild.iconURL() ?? undefined })
      .setFooter({ text: `Por ${ctx.user.username}`, iconURL: ctx.user.displayAvatarURL() })
      .setTimestamp();

    await canal.send({ embeds: [embed] });
    ctx.message?.delete().catch(() => null);

    const confirm = await ctx.channel.send({ embeds: [
      new EmbedBuilder().setColor(0x00c851).setDescription(`✅ Anuncio enviado en ${canal}.`),
    ]});
    setTimeout(() => confirm.delete().catch(() => null), 5000);
  },
};
