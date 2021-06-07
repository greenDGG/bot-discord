const Discord = require('discord.js');

module.exports = {
  name: "clear", 
  alias: ["limpiar"], 
  
execute (client, message, args){


    const clear = args.join(' ');

  var perms = message.member.hasPermission("MANAGE_MESSAGES")
  if(!perms) return message.channel.send("No Tengo Permisos Para Gestionar Mensajes")


 if(!clear) return message.channel.send("Debes Poner Una Cantidad")
 if(isNaN(clear)) return message.channel.send("Debes Colocar Un Numero No Una Letra")

  if(clear === '0') return message.channel.send("Debes Escribir Un Numero Mayor A **0** !")
  
  message.channel.bulkDelete(clear) 
  return message.channel.send(`**Se Han Borrado ${clear} Mensajes Correctamente**`).then(msg => {msg.delete({ timeout: 5000 })}
    
    
  )
  

 }

} 