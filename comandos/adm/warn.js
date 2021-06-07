const Discord = require('discord.js');

module.exports = {
  name: "warn", 
  alias: ["advertir"], 
  
execute (client, message, args){

    const nopermisossuficientes = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription("No tengo suficientes permisos!")
      if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(nopermisossuficientes)
    
      let user = message.mentions.members.first();
    
      let warnReason = args.join(' ').slice(22);
      const sinpermisos = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setDescription("No tienes permisos para usar este comando!")
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(sinpermisos)
    
      const mensionar = new Discord.MessageEmbed()
      .setColor("#FF0000")
      .setDescription("Debes mencionar a alguien!")
      if(!user) return message.channel.send(mensionar)
    
    const compareposition = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription("No puedes dar una advertencia a alguien superior a ti")  
      if (message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0 )
      return message.channel.send(compareposition)
    
      
      if(user === message.author) return message.channel.send("No te puedes dar una advertencia a ti mismo")
    
    
    const razon = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription("Debes escribir una razón!")
      if(!warnReason) return message.channel.send(razon)
    
    const banreason = new Discord.MessageEmbed()
    .setTitle(`${user.displayName} Fue Advertido`)
    .setColor("#B40431")
    .setDescription(`El Ususario ${user} fue **Advertido** Por ${warnReason}`)
      client.channels.cache.get("846497413484511302").send(banreason)

  

 }

} 