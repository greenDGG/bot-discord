const Discord = require('discord.js');
const db = require('megadb')
let dine = new db.crearDB('dinero')

module.exports = {
  name: "dep", 
  alias: ["depositar"], 
  
async execute (client, message, args){

    const user = message.author;

    const din = await dine.get(`${user.id}.dinero`);    
    
    const banco = await dine.obtener(`${user.id}.banco`);


    if(isNaN(args[0])){
        let solonumeros = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL({ dynamic:true }))
        .setDescription(" `Pon la cantidad que quieres depositar a tu BANCO`")
        .setColor("RANDOM")
        .setFooter("Cuentas con un saldo de "+ din)
        return message.channel.send(solonumeros)
    }


    if(args[0] > din){
        let nomayorque = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.avatarURL({ dynamic:true }))
        .setDescription(" `No puedes depositar mas de lo que tienes`")
        .setColor('RANDOM')
        .setFooter("Cuentas con un saldo de "+ din)
        return message.channel.send(nomayorque)
    }


    dine.sumar(`${user.id}.banco`, args[0]);
    dine.restar(`${user.id}.dinero`, args[0]);

    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic:true }))
    .addField(" Depositaste: " + args[0] + " en tu Banco.", `Tu Saldo Bancario es ${await dine.obtener(`${user.id}.banco`)}`)
    .setColor("RANDOM")
    return message.channel.send(embed)

  

 }

} 