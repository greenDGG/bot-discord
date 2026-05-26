const { EmbedBuilder } = require('discord.js');
const { Aki } = require('aki-api');

const emojis    = ['👍', '👎', '❔', '🤔', '🙄', '❌'];
const isPlaying = new Set();

module.exports = {
  name: 'akinator',
  alias: ['aki'],
  description: 'Juega al Akinator — piensa en un personaje y adivina',
  category: 'games',
  options: [],

  async run(ctx) {
    if (isPlaying.has(ctx.user.id))
      return ctx.reply(':x: Ya tienes una partida activa.');

    isPlaying.add(ctx.user.id);
    const aki = new Aki('es');
    await aki.start();

    const makeEmbed = () => new EmbedBuilder()
      .setTitle(`${ctx.user.username} — Pregunta ${aki.currentStep + 1}`)
      .setColor(0x0008ff)
      .setDescription(`**${aki.question}**\n${aki.answers.map((a, i) => `${a} | ${emojis[i]}`).join('\n')}`);

    const msg = await ctx.channel.send({ embeds: [makeEmbed()] });
    for (const e of emojis) await msg.react(e);

    const collector = msg.createReactionCollector({
      filter: (r, u) => emojis.includes(r.emoji.name) && u.id === ctx.user.id,
      time: 360000,
    });

    collector.on('end', () => isPlaying.delete(ctx.user.id));

    collector.on('collect', async ({ emoji, users }) => {
      users.remove(ctx.user).catch(() => null);
      if (emoji.name === '❌') return collector.stop();

      await aki.step(emojis.indexOf(emoji.name));

      if (aki.progress >= 70 || aki.currentStep >= 78) {
        await aki.win();
        collector.stop();

        await ctx.channel.send({ embeds: [new EmbedBuilder()
          .setTitle('¿Es este tu personaje?')
          .setDescription(`**${aki.answers[0].name}**\n${aki.answers[0].description}\nClasificación **#${aki.answers[0].ranking}**\n\n[si (**s**) / no (**n**)]`)
          .setImage(aki.answers[0].absolute_picture_path)
          .setColor(0x0008ff)] });

        const res = await ctx.channel.awaitMessages({
          filter: m => /(si|no|s|n)/i.test(m.content) && m.author.id === ctx.user.id,
          max: 1, time: 30000,
        }).catch(() => null);

        const isWinner = res && /si|s/i.test(res.first().content);
        ctx.channel.send({ embeds: [new EmbedBuilder()
          .setTitle(isWinner ? '¡Estupendo! Adiviné bien.' : '¡Ganaste! No lo adiviné.')
          .setColor(0x0008ff)
          .setDescription('¡Gracias por jugar!')] });
      } else {
        msg.edit({ embeds: [makeEmbed()] });
      }
    });
  },
};
