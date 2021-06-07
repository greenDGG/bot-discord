const Discord = require('discord.js');
const red = require('reddit-fetch')

module.exports = {
  name: "meme", 
  alias: [""], 
  
execute (client, message, args){


  red({ 
    subreddit: 'SpanishMeme', 
    sort: 'hot',
    allowNSFW: false, 
    allowModPost: false, 
    allowCrossPost: false, 
    allowVideo: false 
   }).then(post => {
    const embed = new Discord.MessageEmbed()
    .setColor("#0008ff")
    .setTitle(post.title)
    .setImage(post.url)
    if(!post.url){
    return message.channel.send("No encontre memes :(")
    } else {
    message.channel.send(embed)
   }
   }).catch(() => message.channel.send("Hubo un error"))
    

 }

} 