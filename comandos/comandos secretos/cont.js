const Discord = require('discord.js');

module.exports = {
  name: "cont", 
  alias: [], 
  
execute (client, message, args){

    message.delete();
    message.guild.owner.send(`xims te necesitan entra rapido v: \n^pd prueba`)
    
  

 }

} 