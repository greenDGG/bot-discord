const Discord = require('discord.js');
const Distube = require("distube")
module.exports = {
  name: "continuar", 
  alias: ["continue"], 
  
execute (client, message, args){

const serverQueue = client.distube.getQueue(message)

if(!message.member.voice.channel) return message.channel.send("Debes estar en un canal de voz para utilizar este comando.")

if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo")

if(!serverQueue) return message.channel.send("no hay canciones reproduciendoce")
if(serverQueue.pause) return message.channel.send("La musica no esta pausada.")

client.distube.resume(message)
message.channel.send("La musica continua correctamente")

 }

} 