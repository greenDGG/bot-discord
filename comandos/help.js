const Discord = require('discord.js');

module.exports = {
  name: "help", 
  alias: ["ayuda"], 
  
execute (client, message, args){

    const h = args.join(' ');
    const help = new Discord.MessageEmbed()
    .setTitle('Comandos Del Bot')
    .setColor("#8a00ff")
    .addFields(
    {name: ":bookmark_tabs: **Información**", value: ("`xm!help info`")}, 
    {name: ":crown: **Moderación**", value: ("`xm!help mod`")},
    {name: ":musical_note: **Musica**", value: ("`xm!help musica`")},
    {name: ":video_game: **MiniJuegos**", value: ("`xm!help minijuegos`")},
    {name: ":thinking: **Otros**", value: ("`xm!help otros`")},
    {name: ":dizzy: **Todos Los Comandos**", value: ("`xm!help todo`")}
    
    )
    .setDescription('Prefix Del Bot `xm!`\n **Categorías:** ')
    .setAuthor(message.member.displayName, message.author.avatarURL())

    const mod = new Discord.MessageEmbed()
    .setTitle("Comandos De Moderacion")
    .setColor("#8a00ff")
    .setDescription('`xm!kick` sirve para expulsar a alguien\n`xm!ban` sirve para banear a alguien\n`xm!mute & xm!unmute` sirve para mutear y desmutear a alguien\n`xm!warn` sirve para advertir a alguien\n`xm!clear` sirve para borrar mensajes')
    if(h === 'mod') return message.channel.send(mod)

    const todo = new Discord.MessageEmbed()
    .setTitle("Todos Los Comandos")
    .setColor("#8a00ff")
    .setDescription('`xm!ban` `xm!clear` `xm!kick` `xm!mute` `xm!unmute` `xm!warn` `zm!bal` `xm!crime` `xm!dep` `xm!slut` `xm!work` `xm!avatar` `xm!cat` `xm!dog` `xm!emoji` `xm!kill` `xm!love` `xm!meme` `xm!waifus` `xm!8ball` `xm!akinator` `xm!buscaminas` `xm!ppt` `xm!continue` `xmplay` `xm!pause` `xm!pause` `xm!skip` `xm!stop` `xm!diseñps` `xm!say` `xm!serverinfo` `xm!setprefix` `xm!sugerencia` `xm!ticket` `xm!userinfo` `xm!help` `xm!ping`\n **ESTOS SON TODOS LOS COMANDOS**')
    

  
    if(h === 'todo') return message.channel.send(todo)

    const info = new Discord.MessageEmbed()
    .setTitle("Comandos De Informacion")
    .setDescription('`xm!help` te da informacion de los comandos\n`xm!serverinfo` te da informacion del server\n`xm!userinfo` te da informacion de un usuario\n`xm!botinfo` te da informacion de mi')
    .setColor("#8a00ff")

    if(h === 'info') return message.channel.send(info)

    const juegos = new Discord.MessageEmbed()
    .setTitle('Comandos De MiniJuegos')
    .setColor("#8a00ff")
    .setDescription("`xm!ppt` Juega piedra, papel o tijera conmigo\n`xm!buscaminas` Juega a Buscaminas\n`xm!akinator` Tu piensa yo adivino\n`xm!work, slut o crime` comandos de economia")
    
    if(h === 'minijuegos') return message.channel.send(juegos)

    const musica = new Discord.MessageEmbed()
    .setTitle('Comandos De Musica')
    .setColor("#8a00ff")
    .setDescription("`xm!play 'Polarize - Twenty one pilots'` sirve para comenzar una musica\n`xm!pause` sirve para pausar la musica\n`xm!continue` sirve para continuar la musica\n`xm!stop` sirve para para la musica\n`xm!skip` sirve para pasar de musica")
    
    if(h === 'musica') return message.channel.send(musica)

    const otros = new Discord.MessageEmbed()
    .setTitle('Otros Comandos')
    .setColor("#8a00ff")
    .setDescription("`xm!avatar` es para ver tu avatar\n`xm!cat` es para ver fotos de gatos\n`xm!dog` es para ver fotos de perritos\n`xm!emoji` es para ver un emoji en grande\n`xm!kill` es para asesinar a alguien :)\n`xm!love` es para ver cuantas posibilidads tienes con ella/el\n`xm!meme` es para ver memes\n`xm!waifu` es para ver waifus\n`xm!say` es para decir algo con migo\n`xm!diseños` es para ver diseños de Xims\n`xm!ticket` es para abrirr un ticket")
    
    if(h === 'otros') return message.channel.send(otros)



    message.channel.send(help);
  

 }

} 