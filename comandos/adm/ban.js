const Discord = require('discord.js');

module.exports = {
  name: "ban", 
  alias: ["banear"], 
  
execute (client, message, args){

    const nopermisossuficientes = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription("No tengo suficientes permisos!")
      if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(nopermisossuficientes)
    
      let user = message.mentions.members.first();
    
      let banReason = args.join(' ').slice(22);
      const sinpermisos = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setDescription("No tienes permisos para usar este comando!")
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(sinpermisos)
    
      const mensionar = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setDescription("Debes mencionar a alguien!")
      if(!user) return message.channel.send(mensionar)

      if(user.id === message.author.id) return message.channel.send("No te puedes banear a ti mismo :rolling_eyes:")
    
    const compareposition = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription("no puedes banear a una persona superior a ti")  
      if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0 )
      return message.channel.send(compareposition)
    
      
      
    
    
    const razon = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription("Debes escribir una razón!")
      if(!banReason) return message.channel.send(razon)
    
    const banreason = new Discord.MessageEmbed()
    .setTitle(`      [BAN] ${user.displayName}`)
    .setColor("#B40431")
    .setDescription(`El Ususario ${user} fue **Baneado** Por ${banReason}`)
      user.ban({ reason: banReason})
      client.channels.cache.get("837438738958385167").send(banreason)

  

 }

} 