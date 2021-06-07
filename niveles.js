const Discord = require('discord.js');
const db = require('megadb');
let levels_db = new db.crearDB("niveles");

let cooldown = new Set();
module.exports = {
    nivelesFunc: async (message) => {

        if(cooldown.has(message.author.id)) return;

        cooldown.add(message.author.id);

        setTimeout(() => {
        cooldown.delete(message.author.id);
        }, 30000);

        if(message.content.length <= 5) return;

        if(!levels_db.tiene(message.guild.id)) levels_db.establecer(message.guild.id, {})
        if(!levels_db.tiene(`${message.guild.id}.${message.author.id}`)) levels_db.establecer(`${message.guild.id}.${message.author.id}`, {xp: 0, nivel: 1})
        let { xp, nivel } = await levels_db.obtener(`${message.guild.id}.${message.author.id}`)
        let randomxp = Math.floor(Math.random() * 30) + 1
        let levelup = 5 * (nivel ** 2) + 50 * nivel + 100

        if((xp + randomxp) >= levelup) {
            levels_db.establecer(`${message.guild.id}.${message.author.id}`, {xp: 0, nivel: parseInt(nivel+1)})
            return client.channels.cache.get("837517913497272371").send(`${message.member} acabas de subir al nivel ${parseInt(nivel+1)}!`)
        }
        else{
            levels_db.sumar(`${message.guild.id}.${message.author.id}.xp`, randomxp)
            
        }

    }
 


  

 }

