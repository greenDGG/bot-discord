const Discord = require('discord.js');


module.exports = {
  name: "ping", 
  alias: [""], 

execute (client, message, args){
    
    const ping = new Discord.MessageEmbed()

  .setColor("#0008ff")
  .setDescription(`=== ========= ===\n   :ping_pong: **Pong**\n Tu ping es de.. - ${client.ws.ping}ms\n=== ========= ===`)
message.channel.send(ping)

 }

} 