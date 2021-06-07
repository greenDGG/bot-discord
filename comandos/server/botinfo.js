const Discord = require('discord.js');

module.exports = {
  name: "botinfo", 
  alias: ["bi"], 
  
execute (client, message, args){
const infobot = new Discord.MessageEmbed()
  
.addFields(
  {name: "👑 Owen 👑", value: ("• x.XimStudio.x#0146"), inline: true},
  {name: "⌨️ Desarrollador ⌨️", value: ("• Denis_.#8998"), inline: false},
  {name: "<:js:850762632071217172> Programación <:js:850762632071217172>", value: ("• Versión del bot:  2.0.0 \n• Lenguaje: JavaScript\n• Prefijo: xm!"), inline: true},
  
  {name: ":gift: Fecha De Creación :gift:", value: ("• 5/13/2021")},

)

.setAuthor("Información de Mi ", "https://cdn.discordapp.com/avatars/842203783874215936/eccf1831ee1c10a3bbeafa8bdd9ac404.webp")
message.channel.send(infobot)

}
}