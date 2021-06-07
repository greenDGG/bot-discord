const Discord = require('discord.js');
const Distube = require("distube")

module.exports = {
  name: "play", 
  alias: ["p"], 
  
execute (client, message, args){

  client.distube = new Distube(client, {
    emitNewSongOnly: true,
    searchSongs: false,
    leaveOnStop: true,
    leaveOnFinish: true,
    leaveOnEmpty: true
  });
  
  client.distube.on("addList", (message, playlist) => {
    message.channel.send(`PlayList añadida: ${playlist.name} - ${playlist.songs.length}`)
  })
  
  client.distube.on("addSong", (message, queue, song) => {
    message.channel.send(`Cancion añadida: ${song.name} - ${song.formattedDuration}`)
  })
  
  client.distube.on("playSong", (message, playsong) => {
    const song = new Discord.MessageEmbed()
    .setDescription(`Reproduciendo ahora:\n ${playsong.name}n\ Duracion: ${song.formattedDuration}`)
    .setColor('#0008ff')
    message.channel.send(song)
  })
  
  client.distube.on("playList", (message, playlist) => {
    message.channel.send(`Reproduciendo PlayList: ${playlist.name}`)
  })
  
  client.distube.on("error", (message, error) => {
    console.log(error)
  })
  

    const cancion = args.join(" ")
if(!cancion) return message.channel.send("Debes Escribir Una Canción")
if(!message.member.voice.channel) return message.channel.send("Debes de estar en un canal de voz")
if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes de estar en el mismo canal de voz que yo")

client.distube.play(message, cancion)

  

 }

} 