const Discord = require('discord.js');
const db = require('megadb');
let levels_db = new db.crearDB("niveles");

module.exports = {
  name: "level", 
  alias: ["nivel"], 
  
async execute (client, message, args){

    
    if(!levels_db.tiene(`${message.guild.id}`)) return message.channel.send("Este servidor no tiene ningun usuarion en la ranklist, se el primero!")
    let usuario = message.mentions.members.first() || message.member;
    if(!levels_db.tiene(`${message.guild.id}.${usuario.id}`)) return message.channel.send("Este usuario no tiene xp ni nivel")
    let { xp, nivel } = await levels_db.obtener(`${message.guild.id}.${usuario.id}`) 
    let levelup = 5 * (nivel ** 2) + 50 * nivel + 100

    const embed = new Discord.MessageEmbed()
    .setThumbnail(message.author.displayAvatarURL)
    .setDescription(`Nivel del usuario ${usuario}\nXP: ${xp}/${levelup}\nNivel: ${nivel}`)
    .setColor("BLUE")
    return message.channel.send(embed)

  

 }

} 