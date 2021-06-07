const Discord = require('discord.js');

module.exports = {
  name: "kick", 
  alias: ["expulsar"], 
  
execute (client, message, args){

    const nopermisossuficientes = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription("No tengo suficientes permisos!")
  if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(nopermisossuficientes)

  let user = message.mentions.members.first();

  let kickReason = args.join(' ').slice(22);
  const notienes = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription("No tienes permisos para usar este comando!")
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(notienes)
  const mencionar = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription("Debes mencionar a alguien!")
  if(!user) return message.channel.send(mencionar)

  const mismo = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription("No te puedes **Expulsar** a ti mismo :rolling_eyes:")
  if(user.id === message.author.id) return message.channel.send(mismo)


  const superior = new Discord.MessageEmbed()
  .setColor("#FF0000")
  .setDescription("No puedes **Expulsar** a una persona superior a ti")
  if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0 )
  return message.channel.send(superior)
  
  
  const razon = new Discord.MessageEmbed()
  .setColor("RED")
  .setDescription("Debes escribir una razón!")
  if(!kickReason) return message.channel.send(razon)
  const kickreason = new Discord.MessageEmbed()
    .setTitle(`      [KICKED] ${user.displayName}`)
    .setColor("RANDOM")
    .setDescription(`El Usuario ${user} fue **Expulsado** Por ${kickReason}`)
  user.kick({ reason: kickReason})
  message.channel.send(kickreason)

  

 }

} 