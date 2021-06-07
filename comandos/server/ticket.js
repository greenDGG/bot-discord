const Discord = require('discord.js');

module.exports = {
  name: "ticket", 
  alias: ["cupon"], 
  
execute (client, message, args){

    

     

    const ticket = new Discord.MessageEmbed()
    .setTitle("**PIDE TU DISEÑO**")
    .setDescription("¿Ya te decidiste por comprar? dale a :envelope_with_arrow:")
    .setColor("#8a00ff")

    message.channel.send(ticket).then(m => {
        m.react("📩")
        m.awaitReactions((reaction, user) => {
            if(reaction.emoji.name === '📩') {

                let everyone = m.guild.roles.cache.find(rol => rol.name === '@everyone')
               
                const pide = new Discord.MessageEmbed()
                .setTitle("Pide Tu Diseño")
                .setDescription(`${user.username} dinos ¿a quien le vas a comprar?`)
                .setColor("RANDOM")
                
                
                m.guild.channels.create(`ticket-${user.username}`, {
                    permissionOverwrites: [
                        {
                            id: everyone.id,
                            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        },
                        {
                            id: user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                        }
                    ]
                }).then((c) => c.send(`${user}`, pide))

        
               
                
                
            }
        })
        
    })
    
    
  

  
}
}
