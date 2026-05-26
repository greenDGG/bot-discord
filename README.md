# Bot Discord

Bot de Discord multipropósito construido con discord.js v14.

## Características

- Comandos de prefijo (`!`) y slash commands (`/`) — ambos desde el mismo archivo
- Sistema de niveles y XP
- Economía con quick.db
- Música con DisTube v5 (YouTube, Spotify)
- Moderación (ban, kick, timeout, warn, clear)
- Sistema de tickets con botones
- Mini juegos (Akinator, Buscaminas, Tres en Raya, 8ball, PPT)
- Prefijo personalizable por servidor

---

## Requisitos

- [Node.js](https://nodejs.org/) v22 o superior
- [Python](https://www.python.org/) (requerido por yt-dlp)
- [yt-dlp](https://github.com/yt-dlp/yt-dlp) instalado en el sistema (`pip install yt-dlp`)
- Una aplicación de Discord en el [Developer Portal](https://discord.com/developers/applications)

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/bot-discord.git
cd bot-discord
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus datos:

```env
TOKEN=tu_token_aqui
CLIENT_ID=id_de_tu_aplicacion
GUILD_ID=id_de_tu_servidor

# IDs de canales (opcional — sin valor, la función queda desactivada)
CHANNEL_WELCOME=
CHANNEL_GOODBYE=
CHANNEL_INVITE_LOG=
CHANNEL_LEVEL_UP=
CHANNEL_BAN_LOG=
CHANNEL_WARN_LOG=

# IDs de roles (opcional)
ROLE_WELCOME=
ROLE_MUTED=
```

### 4. Invitar al bot al servidor

En el Developer Portal → OAuth2 → URL Generator, selecciona los scopes `bot` y `applications.commands`. Copia la URL generada y ábrela en el navegador.

### 5. Registrar slash commands

```bash
npm run deploy
```

### 6. Iniciar el bot

```bash
npm run dev   # desarrollo (reinicio automático)
npm start     # producción
```

---

## Estructura del proyecto

```
├── index.js
├── .env
└── src/
    ├── deploy-commands.js
    ├── config.js
    ├── handlers/
    │   ├── commandHandler.js   # carga y envuelve comandos automáticamente
    │   ├── eventHandler.js
    │   └── musicHandler.js
    ├── events/
    │   ├── ready.js
    │   ├── messageCreate.js
    │   ├── interactionCreate.js
    │   ├── guildMemberAdd.js
    │   └── guildMemberRemove.js
    ├── commands/
    │   ├── admin/    # ban, kick, timeout, warn, clear, setcanal…
    │   ├── casino/   # bal, work, crime, dep, slots…
    │   ├── fun/      # cat, dog, kill, meme, waifus, love, avatar, emoji
    │   ├── games/    # 8ball, ppt, minesweeper, akinator, tictactoe
    │   ├── general/  # help, level, ping, setprefix, cont
    │   ├── music/    # play, pause, resume, skip, stop
    │   └── server/   # serverinfo, userinfo, botinfo, say, suggest, ticket
    └── utils/
        ├── commandWrapper.js   # sistema universal prefix + slash
        ├── db.js
        ├── cooldown.js
        ├── levels.js
        └── economyConfig.js
```

---

## Añadir un comando

Todos los comandos usan `run(ctx)`. El wrapper en `commandWrapper.js` auto-genera el handler de **prefix** y el **slash command** automáticamente — no hay que tocar nada más.

### Estructura mínima

```js
module.exports = {
  name: 'nombre',
  alias: ['alias'],       // opcional
  description: 'Descripción',
  options: [],            // argumentos (vacío si no tiene)

  async run(ctx) {
    ctx.reply('¡Hola!');
  },
};
```

### Objeto `ctx`

| Propiedad | Tipo | Descripción |
|---|---|---|
| `ctx.user` | `User` | Autor del comando |
| `ctx.member` | `GuildMember` | Miembro del servidor |
| `ctx.guild` | `Guild` | Servidor |
| `ctx.channel` | `TextChannel` | Canal donde se ejecutó |
| `ctx.client` | `Client` | Cliente del bot |
| `ctx.args` | `Object` | Argumentos por nombre (`ctx.args.usuario`) |
| `ctx.reply(payload)` | función | Responde (prefix y slash) |
| `ctx.replyEphemeral(payload)` | función | Solo visible para el autor |
| `ctx.message` | `Message \| null` | Solo en prefix |
| `ctx.interaction` | `Interaction \| null` | Solo en slash |

> Para borrar el mensaje del autor: `ctx.message?.delete().catch(() => null)`

### Tipos de opciones

```js
options: [
  { name: 'usuario', type: 'USER',   required: true,  description: '…' },
  { name: 'razon',   type: 'STRING', required: false, description: '…', rest: true },
]
```

| `type` | Resuelve a |
|---|---|
| `STRING` | `string` — con `rest: true` consume todos los args restantes |
| `USER` | `GuildMember` |
| `CHANNEL` | `GuildChannel` |
| `ROLE` | `Role` |
| `INTEGER` | `number` (entero) |
| `NUMBER` | `number` (decimal) |
| `BOOLEAN` | `boolean` |

### Ejemplo completo

```js
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'ban',
  alias: ['banear'],
  description: 'Banea a un usuario',
  options: [
    { name: 'usuario', type: 'USER',   required: true,  description: 'Usuario a banear' },
    { name: 'razon',   type: 'STRING', required: false, description: 'Razón', rest: true },
  ],

  async run(ctx) {
    if (!ctx.member.permissions.has(PermissionFlagsBits.BanMembers))
      return ctx.replyEphemeral('❌ Sin permisos.');

    await ctx.args.usuario.ban({ reason: ctx.args.razon ?? 'Sin razón' });
    ctx.reply({ embeds: [new EmbedBuilder().setDescription(`Baneado: ${ctx.args.usuario}`)] });
  },
};
```

---

## Base de datos (quick.db)

| Export | Archivo | Uso |
|---|---|---|
| `prefixDB` | `prefix.sqlite` | Prefijos por servidor |
| `economyDB` | `economy.sqlite` | Dinero, banco, economía |
| `levelsDB` | `levels.sqlite` | XP y niveles |
| `warnsDB` | `warns.sqlite` | Advertencias |
| `ticketDB` | `tickets.sqlite` | Estado de tickets abiertos |
| `configDB` | `config.sqlite` | Configuración general por servidor |

La configuración de canales por servidor se guarda en `configDB` con clave `channels_<guildId>`:
```js
{ suggest: channelId, ticketCategory: categoryId, welcome: channelId, logs: channelId }
```

Configurable con `!setchannel <tipo> #canal`.

---

## Tecnologías

| Paquete | Versión | Uso |
|---|---|---|
| discord.js | ^14.16 | Framework principal |
| distube | ^5.2 | Sistema de música |
| @distube/yt-dlp | ^2.0 | Backend de YouTube |
| @distube/spotify | ^2.0 | Soporte de Spotify |
| quick.db | ^9.1 | Base de datos SQLite |
| dotenv | ^16.4 | Variables de entorno |
| aki-api | ^5.2 | Akinator |

---

## Licencia

MIT — libre para usar, modificar y distribuir.
