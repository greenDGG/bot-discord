const Discord = require('discord.js');

module.exports = {
  name: "unmute", 
  alias: ["desmute"], 
  
execute (client, message, args){

    if (!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send(
          "Lo siento, pero no tienes permiso para `UNMUTED` a nadie."
        );
      }
    
      if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("No tengo permiso para administrar roles.");
      }
    
      const user = message.mentions.members.first();
    
      if (!user) {
        return message.channel.send(
          "Por favor, mencione al miembro al que desea dejar de silenciar."
        );
      }
      
      let muterole = message.guild.roles.cache.find(x => x.name === "Muted")
      
      
    if(user.roles.cache.has(muterole)) {
        return message.channel.send("El usuario no tiene el rol de `muted` ¿que se supone que debo hacer?")
      }
      
      
      user.roles.remove(muterole)
      
      message.channel.send(`**${message.mentions.users.first().username}** Ya no está silenciado`)
      
      user.send(`has dejado de silenciar a **${message.guild.name}**`)
  

 }

} 