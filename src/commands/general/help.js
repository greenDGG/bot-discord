const { EmbedBuilder } = require('discord.js');
const { prefixDB } = require('../../utils/db');
const config = require('../../config');

module.exports = {
  name: 'help',
  alias: ['ayuda'],
  description: 'Muestra los comandos del bot',

  async execute(client, message, args) {
    const prefix = (await prefixDB.get(`prefix_${message.guild.id}`)) || config.prefix;
    const h = args.join(' ');
    const p = prefix;

    const embeds = {
      mod: new EmbedBuilder().setTitle('Comandos De Moderación').setColor(0x8a00ff)
        .setDescription(`\`${p}kick\` expulsar a alguien\n\`${p}ban\` banear a alguien\n\`${p}mute\` & \`${p}unmute\` mutear/desmutear\n\`${p}warn\` advertir a alguien\n\`${p}clear\` borrar mensajes`),
      info: new EmbedBuilder().setTitle('Comandos De Información').setColor(0x8a00ff)
        .setDescription(`\`${p}help\` información de los comandos\n\`${p}serverinfo\` información del servidor\n\`${p}userinfo\` información de un usuario\n\`${p}botinfo\` información del bot`),
      juegos: new EmbedBuilder().setTitle('Comandos De Mini Juegos').setColor(0x8a00ff)
        .setDescription(`\`${p}ppt\` piedra, papel o tijera\n\`${p}buscaminas\` buscaminas\n\`${p}akinator\` tu piensa yo adivino\n\`${p}tictactoe\` tres en raya\n\`${p}8ball\` la bola mágica`),
      musica: new EmbedBuilder().setTitle('Comandos De Música').setColor(0x8a00ff)
        .setDescription(`\`${p}play <canción>\` reproducir música\n\`${p}pause\` pausar\n\`${p}resume\` continuar\n\`${p}stop\` parar\n\`${p}skip\` saltar canción`),
      casino: new EmbedBuilder().setTitle('Comandos De Economía').setColor(0x8a00ff)
        .setDescription(`\`${p}bal\` ver saldo\n\`${p}work\` trabajar\n\`${p}crime\` crimen\n\`${p}slut\` otro trabajo\n\`${p}dep\` depositar dinero`),
      otros: new EmbedBuilder().setTitle('Otros Comandos').setColor(0x8a00ff)
        .setDescription(`\`${p}avatar\` ver avatar\n\`${p}cat\` fotos de gatos\n\`${p}dog\` fotos de perros\n\`${p}emoji\` ver emoji en grande\n\`${p}kill\` asesinar a alguien\n\`${p}love\` compatibilidad\n\`${p}meme\` memes\n\`${p}waifus\` waifus\n\`${p}say\` repetir texto\n\`${p}diseños\` diseños\n\`${p}ticket\` abrir ticket\n\`${p}sugerencia\` enviar sugerencia`),
      todo: new EmbedBuilder().setTitle('Todos Los Comandos').setColor(0x8a00ff)
        .setDescription('`ban` `clear` `kick` `mute` `unmute` `unban` `warn` `bal` `crime` `dep` `slut` `work` `avatar` `cat` `dog` `emoji` `kill` `love` `meme` `waifus` `8ball` `akinator` `buscaminas` `ppt` `tictactoe` `play` `pause` `resume` `skip` `stop` `diseños` `say` `serverinfo` `setprefix` `sugerencia` `ticket` `userinfo` `botinfo` `help` `ping` `level`'),
    };

    if (embeds[h]) return message.channel.send({ embeds: [embeds[h]] });

    message.channel.send({ embeds: [new EmbedBuilder()
      .setTitle('Comandos Del Bot')
      .setColor(0x8a00ff)
      .setDescription(`Prefijo del bot: \`${p}\`\n**Categorías:**`)
      .addFields(
        { name: ':bookmark_tabs: **Información**',  value: `\`${p}help info\`` },
        { name: ':crown: **Moderación**',            value: `\`${p}help mod\`` },
        { name: ':musical_note: **Música**',         value: `\`${p}help musica\`` },
        { name: ':video_game: **Mini Juegos**',      value: `\`${p}help juegos\`` },
        { name: ':dollar: **Economía**',             value: `\`${p}help casino\`` },
        { name: ':thinking: **Otros**',              value: `\`${p}help otros\`` },
        { name: ':dizzy: **Todos Los Comandos**',    value: `\`${p}help todo\`` },
      )
      .setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL() })] });
  },
};
