module.exports = {
  prefix: 'xm!',

  currency: {
    name:  process.env.CURRENCY_NAME  || 'Coins',
    emoji: process.env.CURRENCY_EMOJI || '🪙',
  },

  channels: {
    welcome:    process.env.CHANNEL_WELCOME    || '',
    goodbye:    process.env.CHANNEL_GOODBYE    || '',
    inviteLog:  process.env.CHANNEL_INVITE_LOG || '',
    levelUp:    process.env.CHANNEL_LEVEL_UP   || '',
    banLog:     process.env.CHANNEL_BAN_LOG    || '',
    warnLog:    process.env.CHANNEL_WARN_LOG   || '',
  },

  roles: {
    welcome: process.env.ROLE_WELCOME || '',
    muted:   process.env.ROLE_MUTED   || 'Muted',
  },

  presence: {
    name:   process.env.PRESENCE_NAME || 'xm!help',
    type:   process.env.PRESENCE_TYPE || 'Streaming',
    url:    process.env.PRESENCE_URL  || 'https://www.twitch.tv/placeholder',
    status: 'online',
  },
};
