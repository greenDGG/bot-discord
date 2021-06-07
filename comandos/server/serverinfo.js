const Discord = require('discord.js');

module.exports = {
  name: "serverinfo", 
  alias: ["svi"], 
  
execute (client, message, args){

  
const info = new Discord.MessageEmbed()
  .setTitle(`Info Del Server ${message.guild.name}`)
  .setThumbnail(message.guild.iconURL())
  .setColor("#8a00ff")
  .addFields(
    {name: ":crown: Owner", value: message.guild.owner, inline: true},
    {name: ":tv: Canales", value: message.guild.channels.cache.size, inline: true},
    {name: ":busts_in_silhouette: Miembros", value: message.guild.memberCount, inline: true},
    {name: ":medal: Roles", value:message.guild.roles.cache.map(r => `${r}`).join("  |  "), inline: true},
    {name: "ID del server", value: message.guild.id},
    {name: ":map: Region", value: message.guild.region, inline: true}
  )
  message.channel.send(info);

}
}