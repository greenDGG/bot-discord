const Discord = require('discord.js');

module.exports = {
  name: "say", 
  alias: ["s"], 
  
execute (client, message, args){

    let say = args.join(' ')
  if(!say) return message.channel.send("Debes poner un texto!")
  message.channel.send(say)
  message.delete();

  

 }

} 