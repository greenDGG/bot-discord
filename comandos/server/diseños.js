const Discord = require('discord.js');

module.exports = {
  name: "diseños", 
  alias: [""], 
  
execute (client, message, args){

    const d1 = new Discord.MessageEmbed()
    .setTitle("Diseños De Xims")
    .setImage("https://cdn.discordapp.com/attachments/791059877468438530/847909681794908250/1622172327786_polarr.jpg")
    .setColor("#8a00ff")

    const d2 = new Discord.MessageEmbed()
    .setTitle("Diseños De Xims")
    .setImage("https://cdn.discordapp.com/attachments/791059877468438530/847909682098339900/1622076776370_polarr.jpg")
    .setColor("#8a00ff")

    const d3 = new Discord.MessageEmbed()
    .setTitle("Diseños De Xims")
    .setImage("https://cdn.discordapp.com/attachments/791059877468438530/847909682366251008/1620866845074_polarr.jpg")
    .setColor("#8a00ff")

    const d4 = new Discord.MessageEmbed()
    .setTitle("Diseños De Xims")
    .setImage("https://cdn.discordapp.com/attachments/791059877468438530/847909682827755600/1620249403794_polarr.jpg")
    .setColor("#8a00ff")




    const embeds = [d1, d2, d3, d4]
    let embedFinal = embeds[Math.floor(Math.random() * embeds.length)]
    message.channel.send(embedFinal)


  

 }

} 