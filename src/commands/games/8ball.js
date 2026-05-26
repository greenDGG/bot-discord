const { EmbedBuilder } = require('discord.js');

const responses = [
  'Sí', 'No', 'Definitivamente', 'Absolutamente',
  'Ni en un millón de años', 'Nunca', 'Sigue soñando',
  'Tal vez', 'Mañana', 'No sé', 'Puede ser', 'Mmm...', 'Eeee...', '👀',
];

module.exports = {
  name: '8ball',
  alias: [],
  description: 'La bola mágica responde tu pregunta',
  options: [
    { name: 'pregunta', type: 'STRING', required: true, description: 'Tu pregunta', rest: true },
  ],

  async run(ctx) {
    const question = ctx.args.pregunta;
    if (!question) return ctx.reply('¡Escribe tu pregunta!');
    ctx.reply({ embeds: [new EmbedBuilder()
      .setTitle(':8ball: 8Ball :8ball:')
      .setDescription(`**Tu pregunta:**\n${question}\n\n**Mi respuesta:**\n${responses[Math.floor(Math.random() * responses.length)]}`)
      .setColor(0x0008ff)] });
  },
};
