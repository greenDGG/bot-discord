const Discord = require('discord.js');

module.exports = {
  name: "avatar", 
  alias: ["av"], 
  
execute (client, message, args){

    let avatares = message.mentions.members.first() || message.member;
 let avatar = new Discord.MessageEmbed()
 avatar.setTitle(`Avatar de ${avatares.user.username}`)
 avatar.setColor("#0008ff")
 avatar.setImage(`${avatares.user.displayAvatarURL()}?size=1024`)
 return message.channel.send(avatar)

  

 }

} 