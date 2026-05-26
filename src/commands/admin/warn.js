const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const { warnsDB } = require('../../utils/db');
const config = require('../../config');

module.exports = {
  name: 'warn',
  alias: ['advertir'],
  description: 'Advierte a un usuario y guarda el registro',

  async execute(client, message, args) {
    const err = t => message.channel.send({ embeds: [new EmbedBuilder().setColor(0xFF0000).setDescription(t)] });

    if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) return err('No tienes permisos!');
    const user = message.mentions.members.first();
    if (!user) return err('Debes mencionar a alguien!');
    if (user.id === message.author.id) return err('No te puedes advertir a ti mismo');
    if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0)
      return err('No puedes advertir a alguien superior a ti');

    const reason = args.slice(1).join(' ');
    if (!reason) return err('Debes escribir una razón!');

    const key = `${message.guild.id}.${user.id}`;
    const warns = (await warnsDB.get(key)) ?? [];
    warns.push({ reason, mod: message.author.id, date: Date.now() });
    await warnsDB.set(key, warns);

    const embed = new EmbedBuilder()
      .setTitle(`⚠️ ${user.displayName} fue advertido`)
      .setColor(0xFFA500)
      .addFields(
        { name: 'Razón',        value: reason,                         inline: true },
        { name: 'Moderador',    value: `${message.author}`,            inline: true },
        { name: 'Advertencias', value: `${warns.length} en total`,     inline: true },
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
    if (config.channels.warnLog) client.channels.cache.get(config.channels.warnLog)?.send({ embeds: [embed] });
    user.send(`Has recibido una advertencia en **${message.guild.name}**: ${reason}`).catch(() => null);
  },
};
