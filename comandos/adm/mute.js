const Discord = require('discord.js');

module.exports = {
  name: "mute", 
  alias: ["shh", "silenciar"], 
  
execute (client, message, args){


    if (!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send(
          "Lo siento, pero no tienes permiso para silenciar a nadie."
        );
      }
  
      if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("No tengo permiso para administrar roles.");
      }
  
      const user = message.mentions.members.first();
      
      if(!user) {
        return message.channel.send("Mencione al miembro a quien desea silenciar")
      }
      
      if(user.id === message.author.id) {
        return message.channel.send("No te silenciare -_-");
      }
      
      
      let reason = args.slice(1).join(" ")
      
      
      if(!reason) {
        return message.channel.send("Por favor, da la razón para silenciar al miembro")
      }
      
    
      
      let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
      
      
        if(!muterole) {
        return message.channel.send("Este servidor no tiene rol con el nombre `Muted`")
      }
      
      
     if(user.roles.cache.has(muterole)) {
        return message.channel.send("Usuario Silenciado")
      }
      
    
      
      
      user.roles.add(muterole)
      
      message.channel.send(`Muteado **${message.mentions.users.first().username}** por \`${reason}\``)
      
      user.send(`Han Muteado a **${message.guild.name}** Por \`${reason}\``)
  

 }

} 