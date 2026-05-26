const fs   = require('fs');
const path = require('path');
const { wrap } = require('../utils/commandWrapper');

module.exports = (client) => {
  const commandsPath = path.join(__dirname, '../commands');
  const categories   = fs.readdirSync(commandsPath);

  for (const category of categories) {
    const categoryPath = path.join(commandsPath, category);
    if (!fs.statSync(categoryPath).isDirectory()) continue;

    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'));
    for (const file of files) {
      try {
        const command = wrap(require(path.join(categoryPath, file)));
        if (!command.name) continue;
        client.commands.set(command.name, command);
        if (command.data) client.slashCommands.set(command.name, command);
      } catch (err) {
        console.error(`[CommandHandler] Error cargando ${category}/${file}:`, err.message);
      }
    }
  }

  console.log(`[CommandHandler] ${client.commands.size} comandos cargados.`);
};
