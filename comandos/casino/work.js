const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')

let cooldown = new Set();

module.exports = {
  name: "work", 
  alias: ["trabajar"], 
  
execute (client, message, args){

if(cooldown.has(message.author.id)){
  message.channel.send(`${message.author}, Debe esperar 30s antes de volver a usar este comando.`)

  return;
}
cooldown.add(message.author.id);

setTimeout(() => {
  cooldown.delete(message.author.id);
}, 30000);


    const user = message.author;

    if(!dinero.tiene(`${user.id}`))
    dinero.establecer(`${user.id}`,{dinero: '0', banco: '0'});

    let random = (Math.floor(Math.random() * 1000)) + 1000 

    let trabajo = ["Policia", "Piloto", "Fbi", "Hacker", "Panadero", "Albañil", "Carpintero", "Mecánico", "Arqueólogo", "Arquitecto", "Abogado", "Programador de computadoras", "Diseñador", "Bombero", "Actor"]
    let randomtrabajo = trabajo[Math.floor(Math.random() * trabajo.length)]
    
    dinero.sumar(`${user.id}.dinero`, random)

    const embed = new Discord.MessageEmbed()

    .setTitle("Trabajo")
    .setDescription(`El usuario ${user} ha trabajado de **${randomtrabajo}** y a ganado **${random}**`)
    .setColor("GREEN")

    message.channel.send(embed)
   

 }

} 