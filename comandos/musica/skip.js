const Discord = require('discord.js');

module.exports = {
  name: "skip", 
  alias: ["saltar"], 
  
execute (client, message, args){


    const serverQueue = client.distube.getQueue(message)

if(!message.member.voice.channel) return message.channel.send("Debes estar en un canal de voz para utilizar este comando.")

if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo")

if(!serverQueue) return message.channel.send("no hay canciones reproduciendoce")

client.distube.skip(message)
message.channel.send("Se ha pasado la musica correctamente")
    
    

  

 }

} 