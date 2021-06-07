const Discord = require('discord.js');

module.exports = {
    name: "unban", 
    alias: [""], 
    
    async execute (client, message, args) {

        let toBan = await bot.users.fetch(args[0])

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You need permissions!") 
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Bot need permissions!") 

        const reason = args[1] || "There was no reason!";

        message.guild.members.unban(toBan, reason)

        message.channel.send(`${toBan} has been unbanned from the server!`) 
      
    }
}