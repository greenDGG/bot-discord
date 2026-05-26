require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');

const commandHandler = require('./src/handlers/commandHandler');
const eventHandler   = require('./src/handlers/eventHandler');
const musicHandler   = require('./src/handlers/musicHandler');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
});

client.commands      = new Collection();
client.slashCommands = new Collection();
client.invites       = new Collection();

client.distube = new DisTube(client, {
  emitNewSongOnly: true,
  leaveOnStop:     true,
  leaveOnFinish:   true,
  leaveOnEmpty:    true,
  plugins: [new YtDlpPlugin(), new SpotifyPlugin()],
});

commandHandler(client);
eventHandler(client);
musicHandler(client);

client.login(process.env.TOKEN);
