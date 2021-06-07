const Discord = require('discord.js');

module.exports = {
  name: "cat", 
  alias: [""], 
  
execute (client, message, args){

    var cat = ["https://img.dibujos-animados.org/2015/05/gatos-lindos-08.jpg", "http://www.defondos.com/bulkupload/gatos-fotos/Animales/Gatos/Lindos%20Gatitos_800.jpg", "https://img.comunidades.net/lin/lindos-gatos/Lindos_Gatos_de_Raca_Ragdoll.jpeg", "http://3.bp.blogspot.com/-rU2xm54-KSw/UnFyxbjtbNI/AAAAAAAASSo/r2W5vDhKojk/s1600/fotos-de-lindo-gatito.jpg", "https://image.freepik.com/foto-gratis/gatos-lindos-estan-limpiando-sus-piernas_46176-165.jpg", "http://www.fotosanimales.es/wp-content/uploads/2018/06/fotos-gatitos_01.jpg", "http://4.bp.blogspot.com/-szObz-RZzfk/Ubv3ikoWNxI/AAAAAAAAC-8/rcACFS21W6g/s1600/imagens-gatos-lindos-2.jpg", "https://i.ytimg.com/vi/ByRSxAqArzQ/maxresdefault.jpg", ""]
    const cats = new Discord.MessageEmbed()
    .setTitle("Gatos :kissing_heart: ")
    .setColor("#0008ff")
    .setImage(cat[Math.floor(Math.random() * cat.length)])
    message.channel.send(cats)

  

 }

} 