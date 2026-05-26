const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'serverinfo',
  alias: ['svi'],
  description: 'Muestra información del servidor',
  category: 'server',
  options: [],

  async run(ctx) {
    const guild = ctx.guild;
    const owner = await guild.fetchOwner().catch(() => null);

    const textChannels  = guild.channels.cache.filter(c => c.type === 0).size;
    const voiceChannels = guild.channels.cache.filter(c => c.type === 2).size;
    const categories    = guild.channels.cache.filter(c => c.type === 4).size;
    const roles         = guild.roles.cache.size - 1;
    const emojis        = guild.emojis.cache.size;
    const boosts        = guild.premiumSubscriptionCount ?? 0;
    const boostTier     = guild.premiumTier ? `Nivel ${guild.premiumTier}` : 'Sin boost';
    const createdAt     = `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`;
    const verifyLevels  = { 0: 'Ninguno', 1: 'Bajo', 2: 'Medio', 3: 'Alto', 4: 'Muy Alto' };
    const verify        = verifyLevels[guild.verificationLevel] ?? '—';

    const embed = new EmbedBuilder()
      .setColor(0x8a00ff)
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() ?? undefined })
      .setThumbnail(guild.iconURL({ size: 256 }))
      .setImage(guild.bannerURL({ size: 1024 }) ?? null)
      .addFields(
        { name: '👑 Dueño',        value: owner ? `${owner}` : '—',                                        inline: true },
        { name: '🆔 ID',           value: `\`${guild.id}\``,                                                inline: true },
        { name: '🌐 Idioma',       value: guild.preferredLocale,                                            inline: true },

        { name: '👥 Miembros',     value: `${guild.memberCount}`,                                           inline: true },
        { name: '🤖 Bots',         value: `${guild.members.cache.filter(m => m.user.bot).size}`,            inline: true },
        { name: '🏅 Roles',        value: `${roles}`,                                                       inline: true },

        { name: '💬 Texto',        value: `${textChannels}`,                                                inline: true },
        { name: '🔊 Voz',          value: `${voiceChannels}`,                                               inline: true },
        { name: '📁 Categorías',   value: `${categories}`,                                                  inline: true },

        { name: '😀 Emojis',       value: `${emojis}`,                                                      inline: true },
        { name: '🚀 Boosts',       value: `${boosts} (${boostTier})`,                                       inline: true },
        { name: '🔒 Verificación', value: verify,                                                           inline: true },

        { name: '📅 Creado el',    value: createdAt,                                                        inline: true },
      )
      .setFooter({ text: `Solicitado por ${ctx.user.username}`, iconURL: ctx.user.displayAvatarURL() })
      .setTimestamp();

    ctx.reply({ embeds: [embed] });
  },
};
