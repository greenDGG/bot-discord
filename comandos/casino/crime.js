const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')

module.exports = {
  name: "crime", 
  alias: ["crimen"], 
  
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


    
  let dinerobueno = (Math.floor(Math.random() * 9000)) + 2000 
  let dineromalo = (Math.floor(Math.random() * 10000)) + 3000

  if(resulfinal === resulbueno){
    dinero.sumar(`${user.id}.dinero`, dinerobueno)

    const embedb = new Discord.MessageEmbed()

    .setTitle("CRIMEN")
    .setDescription(`${user} ha robado con exito y gano ${dinerobueno}.`)
    .setColor("GREEN")
    message.channel.send(embedb)
}


  if(resulfinal === resulmalo){
    dinero.restar(`${user.id}.dinero`, dineromalo)

    const embedm = new Discord.MessageEmbed()
    .setTitle("CRIMEN")
    .setDescription(`${user} ha fracasado en el robo y perdio ${dineromalo}`)
    .setColor("RED")

    message.channel.send(embedm)

    
}
}}