const Discord = require("discord.js");
const client = new Discord.Client({  ws: {intents: Discord.Intents.ALL}})
const Distube = require("distube")
const db = require('megadb')
const prefix_db = new db.crearDB('prefix')
const fs = require("fs")
const { nivelesFunc } = require("./niveles.js")
 
let { readdirSync } = require('fs'); 
let levels_db = new db.crearDB("niveles")



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
  .setColor(RANDOM)
  message.channel.send(song)
})

client.distube.on("playList", (message, playlist) => {
  message.channel.send(`Reproduciendo PlayList: ${playlist.name}`)
})

client.distube.on("error", (message, error) => {
  console.log(error)
})

/////////7hanled
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

const admcommandFiles = fs.readdirSync('./comandos/adm').filter(file => file.endsWith('.js'));
const casinocommandFiles = fs.readdirSync('./comandos/casino').filter(file => file.endsWith('.js'));
const cmdacommandFiles = fs.readdirSync('./comandos/comandos aparte').filter(file => file.endsWith('.js'));
const minijcommandFiles = fs.readdirSync('./comandos/minijuegos').filter(file => file.endsWith('.js'));
const musiccommandFiles = fs.readdirSync('./comandos/musica').filter(file => file.endsWith('.js'));
const servercommandFiles = fs.readdirSync('./comandos/server').filter(file => file.endsWith('.js'));
const secretocommandFiles = fs.readdirSync('./comandos/comandos secretos').filter(file => file.endsWith('.js'));




for (const file of secretocommandFiles) {
  const command = require(`./comandos/comandos secretos/${file}`);
  client.commands.set(command.name, command);
}




for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.name, command);
}

for (const file of admcommandFiles) {
  const command = require(`./comandos/adm/${file}`);
  client.commands.set(command.name, command);
}
for (const file of casinocommandFiles) {
  const command = require(`./comandos/casino/${file}`);
  client.commands.set(command.name, command);
}
for (const file of cmdacommandFiles) {
  const command = require(`./comandos/comandos aparte/${file}`);
  client.commands.set(command.name, command);
}
for (const file of minijcommandFiles) {
  const command = require(`./comandos/minijuegos/${file}`);
  client.commands.set(command.name, command);
}
for (const file of musiccommandFiles) {
  const command = require(`./comandos/musica/${file}`);
  client.commands.set(command.name, command);
}
for (const file of servercommandFiles) {
  const command = require(`./comandos/server/${file}`);
  client.commands.set(command.name, command);
}
/////////////////////Bienvenida//////////////////////

client.on("guildMemberAdd", (member) => {
  client.channels.cache.get("837520478746050570").send(`Hey ${member.user}, Bienvenido a **WordArt** pide tu diseño crack`)
  member.roles.add("837504473295355915")
})
///////////////////////Despedida////////////
client.on("guildMemberRemove", (member) => {
return  client.channels.cache.get("837437752965857360").send(`${member.user.username} A dejado el server 😔 ||Bueno igual nadie lo queria 😂 ||`)
})



//////invites

const { promisify } = require('util');

const wait = promisify(setTimeout);




let invites;

const id = '837437130028351539';

client.on('ready', async() => {
    await wait(2000);

    client.guilds.cache.get(id).fetchInvites().then(inv => {
        invites = inv;
    })
})

client.on('guildMemberAdd', async(member) => {
    if(member.guild.id !== id) return;

    member.guild.fetchInvites().then(gInvites => {
        const invite = gInvites.find((inv) => invites.get(inv.code).uses < inv.uses);

        const channel = member.guild.channels.cache.get('837780117676883988');

        const embed = new Discord.MessageEmbed()
        .setDescription(`${member} a entrado al server. Fue intivitado por ${invite.inviter}.  Miembro creado ${member.user.createdAt.toLocaleDateString("en-us")}. `)

        channel.send(embed);
    })
})
//////el aviso
client.on("ready", () => {
  console.log("Listo Papi!");
  presence();
}); 

///////presencia

function presence(){
  client.user.setPresence({
     status: "online",
     activity: {
        name: "Diseños | xm!help.",
        
        type: "STREAMING",
        url: "https://www.youtube.com/watch?v=5rTt7ysEYos&t=9s"
     }
  })
}

//////anti links




//////////la cosa del prefix

client.on("message", async message => { 


  let prefix;
if(prefix_db.tiene(message.guild.id)) {
  prefix = await prefix_db.obtener(message.guild.id)
} else {
  prefix = 'xm!'
}

if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
  message.channel.send("**Hola! Soy Xims Bot Mi Prefix Es `'xm!'`\nSi Necesitas Ayuda Escribe `'xm!help'` **")
}

nivelesFunc(message)
    

  
  
  if(message.content.startsWith('hola')){
    if(message.author.bot) return;
    let holas = ["Hola", "Hola ¿como estas?", "Holis 😁", "¡HOLA!", "Hi", "¡Qué tal!", "Buenos días", "Buenas tardes", "Buenas noches", "¡Qué alegría verte!", "¡Cuánto tiempo sin verte!", "¿Qué hay de nuevo?", "¡Pero bueno…! ¿Qué tal…?", "¡Buenas…!", "¡Hola gente!", "Hellou"] 
    let response = holas[Math.floor(Math.random() *  holas.length)]
    message.channel.send(response)
  }

  if(message.content.startsWith('Hola')){
    if(message.author.bot) return;
    let hola2 = ["Hola", "Hola ¿como estas?", "Holis 😁", "¡HOLA!", "Hi", "¡Qué tal!", "Buenos días", "Buenas tardes", "Buenas noches", "¡Qué alegría verte!", "¡Cuánto tiempo sin verte!", "¿Qué hay de nuevo?", "¡Pero bueno…! ¿Qué tal…?", "¡Buenas…!", "¡Hola gente!", "Hellou"] 
    let respuesta = hola2[Math.floor(Math.random() *  hola2.length)]
    message.channel.send(respuesta)
  }
  if(message.content.startsWith('https')){
    

    if(message.member.hasPermission("ADMINISTRATOR"))return;
    
    message.delete()
    message.channel.send("No puedes enviar enlances!")
  }
  if(message.content.startsWith('discord.gg')){
    if(message.member.hasPermission("ADMINISTRATOR"))return;
    message.delete()
    message.channel.send("No puedes enviar invitaciones de otros servers!!")
  }

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLocaleLowerCase();
  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  if(cmd){
  cmd.execute(client, message, args)
  
  }


if (command === "aki") {
  message.channel.send(`<a:1_:849371367232765993> Cargando Juego...`).then(msg => {msg.delete({ timeout: 5000 })})


}

if (command === "akinator") {
  message.channel.send(`<a:1_:849371367232765993> Cargando Juego...`).then(msg => {msg.delete({ timeout: 5000 })})


}



  });

client.login("ODQyMjAzNzgzODc0MjE1OTM2.YJx5ZQ.XrrmdOyqCBzgSe6lQyezunHJ6JA");
