const Discord = require('discord.js');
const db = require('megadb')
let dine = new db.crearDB('dinero')


module.exports = {
  name: "bal", 
  alias: ["balance"], 
  
async execute (client, message, args){

    const user = message.author;

    const din = await dine.get(`${user.id}.dinero`);    
    
    const banco = await dine.obtener(`${user.id}.banco`);

    let balance = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic:true }))
    .setDescription(`**Dinero: ${await dine.obtener(`${user.id}.dinero`)}\nBanco: ${await dine.obtener(`${user.id}.banco`)} **`)
    .setColor("RANDOM")
    return message.channel.send(balance)


  

 }

} 