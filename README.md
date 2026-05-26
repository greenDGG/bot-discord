# Xims Bot

Bot de Discord multipropósito construido con discord.js v14.

## Características

- Comandos de prefijo (`xm!`) y slash commands (`/`)
- Sistema de niveles y XP
- Economía con quick.db
- Música con DisTube v5 (YouTube, Spotify)
- Moderación (ban, kick, mute, warn, clear)
- Sistema de tickets con reacciones
- Seguimiento de invitaciones
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
git clone https://github.com/tu-usuario/xims-bot.git
cd xims-bot
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

> **¿Cómo obtengo el TOKEN?**
> En el [Developer Portal](https://discord.com/developers/applications) → tu aplicación → Bot → Reset Token.
>
> **¿Cómo obtengo el CLIENT_ID y GUILD_ID?**
> Activa el Modo Desarrollador en Discord (Ajustes → Avanzado), luego clic derecho sobre tu servidor o aplicación para copiar el ID.

### 4. Invitar al bot al servidor

En el Developer Portal → OAuth2 → URL Generator, selecciona los scopes:
- `bot`
- `applications.commands`

Y los permisos de bot que necesites (Administrador para testing). Copia la URL generada y ábrela en el navegador.

### 5. Registrar slash commands

```bash
npm run deploy
```

Esto registra los slash commands en el servidor indicado en `GUILD_ID`. Solo necesitas hacerlo una vez o cuando añadas nuevos comandos slash.

### 6. Iniciar el bot

**Desarrollo local** (sin Docker, con reinicio automático):

```bash
npm run dev
```

**Producción local:**

```bash
npm start
```

**Con Docker** (recomendado para deploy):

```bash
docker compose up -d
```

Para ver los logs:

```bash
docker compose logs -f
```

Para detener:

```bash
docker compose down
```

> Las bases de datos SQLite se guardan en la carpeta `data/` y persisten entre reinicios del contenedor gracias al volumen definido en `docker-compose.yml`.

---

## Estructura del proyecto

```
├── index.js                  # Entrada principal
├── .env                      # Variables de entorno (no subir a Git)
├── .env.example              # Plantilla de configuración
└── src/
    ├── deploy-commands.js    # Registra slash commands (npm run deploy)
    ├── config.js             # Configuración del servidor
    ├── handlers/
    │   ├── commandHandler.js # Carga comandos automáticamente
    │   ├── eventHandler.js   # Carga eventos automáticamente
    │   └── musicHandler.js   # Eventos de DisTube
    ├── events/
    │   ├── ready.js
    │   ├── messageCreate.js
    │   ├── interactionCreate.js
    │   ├── guildMemberAdd.js
    │   └── guildMemberRemove.js
    ├── commands/
    │   ├── admin/            # ban, kick, mute, unmute, unban, warn, clear
    │   ├── casino/           # bal, work, crime, slut, dep
    │   ├── fun/              # cat, dog, kill, meme, waifus, love, avatar, emoji
    │   ├── games/            # 8ball, ppt, minesweeper, akinator, tictactoe
    │   ├── general/          # help, level, ping, setprefix, cont
    │   ├── music/            # play, pause, resume, skip, stop
    │   └── server/           # serverinfo, userinfo, botinfo, say, suggest, ticket, designs
    └── utils/
        ├── db.js             # Instancias de quick.db
        └── levels.js         # Lógica del sistema de niveles
```

---

## Añadir un comando

Crea un archivo `.js` en la carpeta de categoría correspondiente dentro de `src/commands/`:

```js
// src/commands/general/ejemplo.js
module.exports = {
  name: 'ejemplo',
  alias: ['ej'],
  description: 'Descripción del comando',

  execute(client, message, args) {
    message.channel.send('¡Hola!');
  },
};
```

El bot lo cargará automáticamente al reiniciar. Para añadir soporte de slash command, agrega también `data` y `slash`:

```js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'ejemplo',
  alias: [],
  description: 'Descripción',
  data: new SlashCommandBuilder()
    .setName('ejemplo')
    .setDescription('Descripción'),

  execute(client, message, args) {
    message.channel.send('¡Hola desde prefijo!');
  },

  async slash(interaction) {
    await interaction.reply('¡Hola desde slash!');
  },
};
```

Luego ejecuta `npm run deploy` para registrar el nuevo slash command.

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
| tresenraya | 0.0.5 | Tres en raya |

---

## Licencia

MIT — libre para usar, modificar y distribuir.
