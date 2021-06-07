const Discord = require('discord.js');
const marsnpm = require("marsnpm")

module.exports = {
  name: "kill", 
  alias: ["matar"], 
  
async execute (client, message, args){


const user = message.mentions.members.first() 

if (!user) return message.reply('Menciona a alguien');
let author = message.author.username;
let url = await marsnpm.kill()
let embed = new Discord.MessageEmbed() 
.setTitle(`${author} es un asesino y mato a ${message.mentions.users.first().username}`)
.setColor("18CBDA")
.setImage(url);
message.channel.send(embed)

  

 }

} 