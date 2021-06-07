const Discord = require('discord.js');

module.exports = {
  name: "sugerencia", 
  alias: ["sug"], 
  
execute (client, message, args){

    if(!args.length) {
        return message.channel.send("Por favor pon una sugerencia")
      }
      
      let channel = message.guild.channels.cache.find((x) => (x.name === "sugerencias" || x.name === "suggestions"))
      
      
      if(!channel) {
        return message.channel.send("no hay canal con nombre - sugerencias")
      }
                                                      
      
      let embed = new Discord.MessageEmbed()
      .setAuthor("SUGERENCIA: " + message.author.tag, message.author.avatarURL())
      .setThumbnail(message.author.avatarURL())
      .setColor("#8a00ff")
      .setDescription(args.join(" "))
      .setTimestamp()
      
      
      channel.send(embed).then(m => {
        m.react("✅")
        m.react("❌")
      })
      
    
      
      message.channel.send("Su Sugerencia se envio correctamente")

  

 }

} 