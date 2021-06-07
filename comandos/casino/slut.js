const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')

module.exports = {
  name: "slut", 
  alias: [], 
  
execute (client, message, args){

  const user = message.author;
  if(!dinero.tiene(`${user.id}`))
    dinero.establecer(`${user.id}`,{dinero: '0', banco: '0'});

   const crimenb = ["algo", "otroalgo"]

   const crimenm = ["nose", "nosex2"]

   let resulbueno = crimenb[Math.floor(Math.random() * crimenb.length)]

   let resulmalo = crimenm[Math.floor(Math.random() * crimenm.length)]

   const resultados = [resulbueno, resulmalo, resulmalo]

   let resulfinal = resultados[Math.floor(Math.random() * resultados.length)]


    
  let dinerobueno = (Math.floor(Math.random() * 5000)) + 2000 
  let dineromalo = (Math.floor(Math.random() * 6000)) + 3000

  if(resulfinal === resulbueno){
    dinero.sumar(`${user.id}.dinero`, dinerobueno)

    const embedb = new Discord.MessageEmbed()

    .setTitle("SLUT")
    .setDescription(`${user} ha ganado ${dinerobueno}.`)
    .setColor("GREEN")
    message.channel.send(embedb)
}


  if(resulfinal === resulmalo){
    dinero.restar(`${user.id}.dinero`, dineromalo)

    const embedm = new Discord.MessageEmbed()
    .setTitle("SLUT")
    .setDescription(`${user} ha perdido ${dineromalo}`)
    .setColor("RED")

    message.channel.send(embedm)

    
  }
   
   
    
    
    

    
    
     
    

    
  
    

      
    



    
    
   

 }

} 