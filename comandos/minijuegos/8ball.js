const Discord = require('discord.js');
const prefix = "xm!";

module.exports = {
  name: "8ball", 
  alias: [""], 
  
execute (client, message, args){


    let question = message.content.slice(prefix.length + 6);
    if (!question)
      return message.channel.send(`¡No especificó su pregunta!`);
    else {
    let responses = [
      "Si",
      "No",
      "Definitivamente",
      "Absolutamente",
      "Ni en un million de años",
      "Nunca",
      "Segui Soñando",
      "Talvez",
      "Mañana",
      "Nose",
      "Puede Ser",
      "Mmm...",
      "Eeee...",
      "👀",
    ];
    let response =
      responses[Math.floor(Math.random() * responses.length - 1)];
    let ball = new Discord.MessageEmbed()
      .setTitle(`    :8ball: 8Ball :8ball:`)
      .setDescription(`**Tu Pregunta:**\n ${question}\n**Mi Respuesta:**\n ${response}`)
      .setColor(`#0008ff`);
    message.channel.send(ball)
  }

  

 }

} 