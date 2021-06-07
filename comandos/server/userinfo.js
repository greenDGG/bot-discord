const Discord = require('discord.js');

module.exports = {
  name: "userinfo", 
  alias: ["uinfo"], 
  
execute (client, message, args){

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let status;
    switch (user.presence.status) {
        case "online":
            status = "Online";
            break;
        case "dnd":
            status = "No Molestar";
            break;
        case "idle":
            status = "Ausente";
            break;
        case "offline":
            status = "OffLine";
            break;
    }
  
    const embed = new Discord.MessageEmbed()
        .setTitle(`Informacion De ${user.user.username}`)
        .setColor(`#8a00ff`)
        .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
        .setAuthor(message.member.displayName, message.author.avatarURL())
        .addFields(
            {
                name: "Nombre: ",
                value: user.user.username,
                inline: true
            },
            {
                name: "#️Etiqueta: ",
                value: `#${user.user.discriminator}`,
                inline: true
            },
            {
                name: "ID: ",
                value: user.user.id,
            },
            {
                name: "Estado actual: ",
                value: status,
                inline: true
            },
            
            {
                name: 'Creación De Cuenta: ',
                value: user.user.createdAt.toLocaleDateString("en-us"),
                inline: true
            },
            {
                name: 'Fecha De Ingreso: ',
                value: user.joinedAt.toLocaleDateString("es-es"),
                inline: true
            },
            {
                name: 'Roles: ',
                value: user.roles.cache.map(role => role.toString()).join(" ,"),
                inline: true
            }
        )
  
    message.channel.send(embed)
    message.delete();

 }

} 