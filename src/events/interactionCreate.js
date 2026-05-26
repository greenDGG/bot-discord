module.exports = {
  name: 'interactionCreate',

  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) return;

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd?.slash) return;

    try {
      await cmd.slash(interaction);
    } catch (err) {
      console.error(`[Slash: ${interaction.commandName}]`, err);
      const reply = { content: 'Hubo un error al ejecutar el comando.', ephemeral: true };
      interaction.replied ? interaction.followUp(reply) : interaction.reply(reply);
    }
  },
};
