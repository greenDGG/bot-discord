const Discord = require('discord.js');

module.exports = {
  name: "dog", 
  alias: [""], 
  
execute (client, message, args){

    var dog = []
  const dogs = new Discord.MessageEmbed()
  .setTitle("Perros :kissing_heart:")
  .setColor("#0008ff")
  .setImage(dog[Math.floor(Math.random() * dog.length)])
  message.channel.send(dogs)

  

 }

} 