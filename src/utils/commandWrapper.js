const { SlashCommandBuilder } = require('discord.js');

// Maps option type → SlashCommandBuilder method
const SLASH_ADDERS = {
  STRING:  (o, b) => b.addStringOption( s => s.setName(o.name).setDescription(o.description ?? '…').setRequired(!!o.required)),
  USER:    (o, b) => b.addUserOption(   s => s.setName(o.name).setDescription(o.description ?? '…').setRequired(!!o.required)),
  CHANNEL: (o, b) => b.addChannelOption(s => s.setName(o.name).setDescription(o.description ?? '…').setRequired(!!o.required)),
  ROLE:    (o, b) => b.addRoleOption(   s => s.setName(o.name).setDescription(o.description ?? '…').setRequired(!!o.required)),
  INTEGER: (o, b) => b.addIntegerOption(s => s.setName(o.name).setDescription(o.description ?? '…').setRequired(!!o.required)),
  NUMBER:  (o, b) => b.addNumberOption( s => s.setName(o.name).setDescription(o.description ?? '…').setRequired(!!o.required)),
  BOOLEAN: (o, b) => b.addBooleanOption(s => s.setName(o.name).setDescription(o.description ?? '…').setRequired(!!o.required)),
};

function buildSlashData(cmd) {
  const builder = new SlashCommandBuilder()
    .setName(cmd.name)
    .setDescription(cmd.description ?? 'Sin descripción');

  for (const opt of (cmd.options ?? [])) {
    const type = opt.type?.toUpperCase() ?? 'STRING';
    SLASH_ADDERS[type]?.(opt, builder);
  }

  return builder;
}

async function parsePrefixArgs(cmd, message, rawArgs) {
  const result = {};
  const opts    = cmd.options ?? [];

  for (let i = 0; i < opts.length; i++) {
    const opt  = opts[i];
    const type = opt.type?.toUpperCase() ?? 'STRING';
    const raw  = rawArgs[i];

    if (type === 'USER') {
      result[opt.name] = message.mentions.members.first()
        || (raw ? message.guild.members.cache.get(raw) : null)
        || null;
    } else if (type === 'CHANNEL') {
      result[opt.name] = message.mentions.channels.first()
        || (raw ? message.guild.channels.cache.get(raw) : null)
        || null;
    } else if (type === 'ROLE') {
      result[opt.name] = message.mentions.roles.first()
        || (raw ? message.guild.roles.cache.get(raw) : null)
        || null;
    } else if (type === 'INTEGER') {
      result[opt.name] = raw ? parseInt(raw) : null;
    } else if (type === 'NUMBER') {
      result[opt.name] = raw ? parseFloat(raw) : null;
    } else if (type === 'BOOLEAN') {
      result[opt.name] = raw ? ['true', 'si', 'yes', '1'].includes(raw.toLowerCase()) : null;
    } else {
      // STRING — rest:true consume todos los args restantes
      result[opt.name] = opt.rest ? (rawArgs.slice(i).join(' ') || null) : (raw ?? null);
    }
  }

  return result;
}

function parseSlashArgs(cmd, interaction) {
  const result = {};
  for (const opt of (cmd.options ?? [])) {
    const type = opt.type?.toUpperCase() ?? 'STRING';
    if      (type === 'USER')    result[opt.name] = interaction.options.getMember(opt.name) ?? interaction.options.getUser(opt.name) ?? null;
    else if (type === 'CHANNEL') result[opt.name] = interaction.options.getChannel(opt.name) ?? null;
    else if (type === 'ROLE')    result[opt.name] = interaction.options.getRole(opt.name) ?? null;
    else if (type === 'INTEGER') result[opt.name] = interaction.options.getInteger(opt.name) ?? null;
    else if (type === 'NUMBER')  result[opt.name] = interaction.options.getNumber(opt.name) ?? null;
    else if (type === 'BOOLEAN') result[opt.name] = interaction.options.getBoolean(opt.name) ?? null;
    else                         result[opt.name] = interaction.options.getString(opt.name) ?? null;
  }
  return result;
}

/**
 * Wraps a command that uses `run(ctx)` into one that also exposes
 * `execute` (prefix) and `slash` + `data` (slash command).
 * Commands that already define `execute`/`slash` are returned unchanged.
 */
function wrap(cmd) {
  if (!cmd.run) return cmd;

  if (!cmd.data) cmd.data = buildSlashData(cmd);

  cmd.execute = async (client, message, rawArgs) => {
    const args = await parsePrefixArgs(cmd, message, rawArgs);
    await cmd.run({
      client,
      guild:   message.guild,
      channel: message.channel,
      user:    message.author,
      member:  message.member,
      args,
      message,
      interaction: null,
      reply:          (p) => message.channel.send(p),
      replyEphemeral: (p) => message.channel.send(p),
    });
  };

  cmd.slash = async (interaction) => {
    const args = parseSlashArgs(cmd, interaction);
    const send = (p, ephemeral = false) => {
      if (interaction.deferred || interaction.replied) return interaction.editReply(p);
      return interaction.reply(ephemeral ? { ...p, ephemeral: true } : p);
    };
    await cmd.run({
      client:  interaction.client,
      guild:   interaction.guild,
      channel: interaction.channel,
      user:    interaction.user,
      member:  interaction.member,
      args,
      message:     null,
      interaction,
      reply:          (p) => send(p, false),
      replyEphemeral: (p) => send(p, true),
    });
  };

  return cmd;
}

module.exports = { wrap };
