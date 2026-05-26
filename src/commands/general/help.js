const { EmbedBuilder } = require('discord.js');
const { prefixDB } = require('../../utils/db');
const config = require('../../config');

const CATEGORY_META = {
  admin:   { label: '🛡️ Moderación',  key: 'mod'     },
  casino:  { label: '💰 Economía',     key: 'casino'  },
  fun:     { label: '🎉 Diversión',    key: 'fun'     },
  games:   { label: '🎮 Mini Juegos',  key: 'juegos'  },
  general: { label: 'ℹ️ General',      key: 'general' },
  music:   { label: '🎵 Música',       key: 'musica'  },
  server:  { label: '🖥️ Servidor',     key: 'server'  },
};

module.exports = {
  name: 'help',
  alias: ['ayuda'],
  description: 'Muestra los comandos del bot',
  category: 'general',
  options: [
    { name: 'categoria', type: 'STRING', required: false, description: 'Categoría a consultar (mod, casino, fun, juegos, general, musica, server)' },
  ],

  async run(ctx) {
    const prefix = (await prefixDB.get(`prefix_${ctx.guild.id}`)) || config.prefix;
    const input  = ctx.args.categoria?.toLowerCase();

    // Agrupar comandos por categoría
    const grouped = {};
    for (const cmd of ctx.client.commands.values()) {
      const cat = cmd.category ?? 'general';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(cmd);
    }

    // Buscar si el input coincide con una key de categoría
    const matchedFolder = Object.entries(CATEGORY_META).find(
      ([folder, meta]) => input === folder || input === meta.key,
    )?.[0];

    if (input && matchedFolder) {
      const meta = CATEGORY_META[matchedFolder];
      const cmds = grouped[matchedFolder] ?? [];
      const lines = cmds.map(c => `\`${prefix}${c.name}\` — ${c.description ?? 'Sin descripción'}`).join('\n');

      return ctx.reply({ embeds: [
        new EmbedBuilder()
          .setColor(0x8a00ff)
          .setTitle(meta.label)
          .setDescription(lines || 'Sin comandos')
          .setFooter({ text: `${cmds.length} comandos` }),
      ]});
    }

    // Menú principal
    const fields = Object.entries(CATEGORY_META).map(([folder, meta]) => {
      const cmds  = grouped[folder] ?? [];
      const names = cmds.map(c => `\`${c.name}\``).join(' ');
      return {
        name:   `${meta.label} (${cmds.length})`,
        value:  names || '—',
        inline: false,
      };
    });

    ctx.reply({ embeds: [
      new EmbedBuilder()
        .setColor(0x8a00ff)
        .setTitle('📖 Comandos del Bot')
        .setDescription(`Prefijo: \`${prefix}\` · También puedes usar \`/\` (slash commands)\n\nUsa \`${prefix}help <categoría>\` para ver detalles.`)
        .addFields(fields)
        .setAuthor({ name: ctx.member.displayName, iconURL: ctx.user.displayAvatarURL() })
        .setFooter({ text: `${ctx.client.commands.size} comandos en total` })
        .setTimestamp(),
    ]});
  },
};
