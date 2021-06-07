const Discord = require('discord.js');

module.exports = {
  name: "ppt", 
  alias: [""], 
  
execute (client, message, args){

    const option = args[0]
    if(!option) return message.channel.send("debes decir: piedra, papel o tijera")

    let opcionesbot = ["Piedra", "Papel", "Tijera"]
    let opcionbot = opcionesbot[Math.floor(Math.random() * opcionesbot.length)]


    if(option === 'piedra'){

        if(opcionbot === 'Piedra'){

        const p1 = new Discord.MessageEmbed()
        .setTitle("**Empate**")
        .setDescription(`Xims a elejido **${opcionbot}**:fist: y tu has elegido **${option}**:fist:`)
        .setColor("YELLOW")

        message.channel.send(p1)
    
        }

    
        if(opcionbot === 'Papel'){

        const pa1 = new Discord.MessageEmbed()
        .setTitle("**Has Perdido**")
        .setDescription(`Xims a elejido **${opcionbot}**:hand_splayed: y tu has elegido **${option}**:fist:`)
        .setColor("RED")

        message.channel.send(pa1)

        }

        if(opcionbot === 'Tijera'){

        const t1 = new Discord.MessageEmbed()
        .setTitle("**Has Ganado**")
        .setDescription(`Xims a elejido **${opcionbot}**:v: y tu has elegido **${option}**:fist:`)
        .setColor("GREEN")

        message.channel.send(t1)
    }
}


 
        if(option === 'papel'){
            if(opcionbot === 'Papel'){
    
            const p2 = new Discord.MessageEmbed()
            .setTitle("**Empate**")
            .setDescription(`Xims a elejido **${opcionbot}**:hand_splayed: y tu has elegido **${option}**:hand_splayed:`)
            .setColor("YELLOW")
    
            message.channel.send(p2)
        
            }
    
        
            if(opcionbot === 'Tijera'){
    
            const pa2 = new Discord.MessageEmbed()
            .setTitle("**Has Perdido**")
            .setDescription(`Xims a elejido **${opcionbot}**:v: y tu has elegido **${option}**:hand_splayed:`)
            .setColor("RED")
    
            message.channel.send(pa2)
    
            }

            if(opcionbot === 'Piedra'){
    
            const t2 = new Discord.MessageEmbed()
            .setTitle("**Has Ganado**")
            .setDescription(`Xims a elejido **${opcionbot}**:fist: y tu has elegido **${option}**:hand_splayed:`)
            .setColor("GREEN")
    
            message.channel.send(t2)   
    }
        }

    if(option === 'tijera'){
        if(opcionbot === 'Tijera'){

        const p3 = new Discord.MessageEmbed()
        .setTitle("**Empate**")
        .setDescription(`Xims a elejido **${opcionbot}**:v: y tu has elegido **${option}**:v:`)
        .setColor("YELLOW")

        message.channel.send(p3)
    
        }

    
        if(opcionbot === 'Piedra'){

        const pa3 = new Discord.MessageEmbed()
        .setTitle("**Has Perdido**")
        .setDescription(`Xims a elejido **${opcionbot}**:fist: y tu has elegido **${option}**:v:`)
        .setColor("RED")

        message.channel.send(pa3)

        }

        if(opcionbot === 'Papel'){

        const t3 = new Discord.MessageEmbed()
        .setTitle("**Has Ganado**")
        .setDescription(`Xims a elejido **${opcionbot}**:hand_splayed: y tu has elegido **${option}**:v:`)
        .setColor("GREEN")

        message.channel.send(t3)   
}}


 }

} 