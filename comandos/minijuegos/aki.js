
const emojis = ["👍", "👎", "❔", "🤔", "🙄", "❌"];
const isPlaying = new Set();
const { Client, MessageEmbed } = require("discord.js");
const { Aki } = require("aki-api");
const prefix = "xm!";

module.exports = {
    name: "akinator", 
    alias: ["aki"], 
    
async execute (client, message, args){

    
    

    if (message.author.bot || !message.guild) return;

    
    

    

    if (isPlaying.has(message.author.id)) {
      return message.channel.send(":x: | El juego ya empezó..");
    }

    
    isPlaying.add(message.author.id);

    const aki = new Aki("es"); 

    await aki.start();
    

    const msg = await message.channel.send(new MessageEmbed()
      .setTitle(`${message.author.username}, Pregunta ${aki.currentStep + 1}`)
      .setColor("#0008ff")
      .setDescription(`**${aki.question}**\n${aki.answers.map((an, i) => `${an} | ${emojis[i]}`).join("\n")}`));

    for (const emoji of emojis) await msg.react(emoji);

    const collector = msg.createReactionCollector((reaction, user) => emojis.includes(reaction.emoji.name) && user.id == message.author.id, {
      time: 60000 * 6
    });
    
    collector
      .on("end", () => isPlaying.delete(message.author.id))
      .on("collect", async ({
        emoji,
        users
      }) => {
        users.remove(message.author).catch(() => null);

        if (emoji.name == "❌") return collector.stop();

        await aki.step(emojis.indexOf(emoji.name));

        if (aki.progress >= 70 || aki.currentStep >= 78) {

          await aki.win();

          collector.stop();

          message.channel.send(new MessageEmbed()
            .setTitle("¿Es este tu personaje?")
            .setDescription(`**${aki.answers[0].name}**\n${aki.answers[0].description}\nClasificación **#${aki.answers[0].ranking}**\n\n[si (**s**) / no (**n**)]`)
            .setImage(aki.answers[0].absolute_picture_path)
            .setColor("#0008ff"));

          const filter = m => /(si|no|s|n)/i.test(m.content) && m.author.id == message.author.id;

          message.channel.awaitMessages(filter, {
              max: 1,
              time: 30000,
              errors: ["time"]
            })
            .then(collected => {
              const isWinner = /si|s/i.test(collected.first().content);
              message.channel.send(new MessageEmbed()
                .setTitle(isWinner ? "¡Estupendo! Adiviné bien una vez más. ":" Uh. eres el ganador")
                .setColor("#0008ff")
                .setDescription("¡Amo jugar contigo!"));
            }).catch(() => null);
        
        } else {
          msg.edit(new MessageEmbed()
            .setTitle(`${message.author.username}, Pregunta ${aki.currentStep + 1}`)
            .setColor("#0008ff")
            .setDescription(`**${aki.question}**\n${aki.answers.map((an, i) => `${an} | ${emojis[i]}`).join("\n")}`));
        }
            
    });
}    

}