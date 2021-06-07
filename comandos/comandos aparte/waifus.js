const Discord = require('discord.js');

module.exports = {
  name: "waifus", 
  alias: ["monas"], 
  
execute (client, message, args){

    var waifu = ["https://cdn.myanimelist.net/images/characters/10/49990.webp", "https://i.pinimg.com/originals/a6/40/5d/a6405d23dbe4e50ad3c326a5c10705f8.jpg", "https://cdn.myanimelist.net/images/characters/7/281783.webp", "https://i.pinimg.com/originals/cf/4c/24/cf4c24df9c5890e97ba8e1512d925658.jpg", "https://i.pinimg.com/564x/70/7a/e5/707ae5f38a9931028e98c54b08fa1fb5.jpg", "https://i.pinimg.com/originals/4b/5d/09/4b5d09b67446c4e5f4034afc27471d35.jpg", "https://i.pinimg.com/originals/a3/29/24/a32924efb2637b49a37d7dfdb03f8beb.jpg", "https://i.pinimg.com/originals/0b/40/63/0b40633c3c0b2b245a6ba8b30baf7706.png"]
  const waifus = new Discord.MessageEmbed()
  
  
  .setColor("#0008ff")
  
  .setImage(waifu[Math.floor(Math.random() * waifu.length)])
  



  message.channel.send(waifus).then(m => {
    m.react("✅")
    m.react("❌")
  })

  

 }

} 