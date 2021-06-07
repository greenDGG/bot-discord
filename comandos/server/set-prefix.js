const Discord = require('discord.js');
const db = require('megadb')
const prefix_db = new db.crearDB('prefix')

module.exports = {
  name: "setprefix", 
  alias: ["sp"], 
  
execute (client, message, args){

  var perms = message.member.hasPermission("ADMINISTRATOR")
  if(!perms) return message.channel.send("No tienes permisos para cambiar el prefix >:(")

  if(!args[0]) return message.channel.send("Debes decir un prefix nuevo")

  message.guild.owner.send(`El prefix ha sido cambiado a **${args[0]}**`)

  prefix_db.establecer(message.guild.id, args[0])

  message.channel.send(`El prefix ha sido cambiado a **${args[0]}**`)

  

 }

} 