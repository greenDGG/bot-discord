const Discord = require('discord.js');
const unders = require('underscore')
const tresenraya = require('tresenraya');

module.exports = {
  name: "3enrayas", 
  alias: ["3r"], 
  
async execute (client, message, args){



  
  const player1 = message.author
  const usuario = message.mentions.users.first();
  

  if(usuario) {
    
    
    if(usuario.id == message.author.id) {
        return message.channel.send('No puedes jugar con tigo mismo.')
    }  


    message.channel.send(`${usuario} Te han retado a jugar a algo?!:fire:\n**Si:** para aceptar\n**No:** Para rechazar`)

}
  if(!usuario) return message.channel.send('Menciona a alguien')




    
    

        
         
        
      
  
  const partida = new tresenraya.partida({ jugadores: [message.author.id, usuario.id] });
    
  partida.on('ganador', (jugador, tablero, paso) => { // cuando encuentra a algún ganador se emite el evento 'ganador'
      
    message.channel.send('¡Ha ganado ' + client.users.cache.get(jugador).username + ' en esta partida! Después de `' + paso + ' pasos.`\n\n' + tablero.string + '\n\nLo siento, ' + client.users.cache.get(partida.perdedor).username + '... 😦');
      
  });
  
  partida.on('empate', (jugadores, tablero, paso) => { // si se produce un empate se emite el evento 'empate'
      
    message.channel.send('¡Ha habido un empate entre ' + jugadores.map(x => client.users.cache,get(x).username).join(' y ') + '!');
      
  });
  
  message.channel.send('Empieza ' + client.users.cache.get(partida.turno.jugador).username + ', elige un número del 1 al 9 [`' + partida.turno.ficha + '`]\n\n' + partida.tablero.string);
   
  const colector = message.channel.createMessageCollector(msg => msg.author.id === partida.turno.jugador && !isNaN(msg.content) && (Number(msg.content) >= 1 && Number(msg.content) <= 9) && partida.disponible(msg.content) && !partida.finalizado);
   
  colector.on('collect', (msg) => {
        
    partida.elegir(msg.content);
    
    if(partida.finalizado) {
      
      colector.stop();
      return;
      
    } 
        
    message.channel.send('Turno de ' + client.users.cache.get(partida.turno.jugador).username + ' [`' + partida.turno.ficha + '`]\n\n' + partida.tablero.string);
   
    })
  
  




 


    
    


 








   
    
 }

} 