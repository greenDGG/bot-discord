const Discord = require('discord.js');

module.exports = {
  name: "emoji", 
  alias: [""], 
  
execute (client, message, args){

    if(!args[0]) return message.channel.send("Debes decirme el emoji")

    let emoji = message.guild.emojis.cache.find(x => x.name === args[0].split(":")[1])
    if(!emoji) return message.channel.send("Eso no es un emoji o no es un emoji del server")
    

    const embed = new Discord.MessageEmbed()
    .setTitle("EMOJI")
    .setImage(`${emoji.url}?size=1024`)
    .setColor("#0008ff")
    message.channel.send(embed)
  

 }

} 