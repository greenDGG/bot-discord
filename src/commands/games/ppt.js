const { EmbedBuilder } = require('discord.js');

const opts  = ['Piedra', 'Papel', 'Tijera'];
const icons = { Piedra: ':fist:', Papel: ':hand_splayed:', Tijera: ':v:' };
const wins  = { Piedra: 'Tijera', Papel: 'Piedra', Tijera: 'Papel' };

module.exports = {
  name: 'ppt',
  alias: [],
  description: 'Juega Piedra Papel o Tijera contra el bot',

  execute(client, message, args) {
    const option = args[0]?.toLowerCase();
    if (!option || !['piedra', 'papel', 'tijera'].includes(option))
      return message.channel.send('Escribe: `piedra`, `papel` o `tijera`');

    const player = option.charAt(0).toUpperCase() + option.slice(1);
    const bot    = opts[Math.floor(Math.random() * opts.length)];

    let title, color;
    if (bot === player)             { title = '**¡Empate!**';     color = 0xFFFF00; }
    else if (wins[bot] === player)  { title = '**¡Has perdido!**'; color = 0xFF0000; }
    else                            { title = '**¡Has ganado!**';  color = 0x00FF00; }

    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle(title)
      .setDescription(`Yo elegí **${bot}** ${icons[bot]} · Tú elegiste **${player}** ${icons[player]}`)
      .setColor(color)] });
  },
};
