const config = require('../config');

module.exports = {
  // Cooldowns en milisegundos
  cooldowns: {
    work:  30_000,
    crime: 90_000,
    slut:  60_000,
    rob:   120_000,
  },

  // Ganancias del trabajo
  work: {
    min: 500,
    max: 1500,
  },

  // Crimen: alto riesgo, alta recompensa
  crime: {
    successRate: 0.40,
    win:  { min: 2000, max: 9000 },
    lose: { min: 1000, max: 4000 },
  },

  // Slut: riesgo medio
  slut: {
    successRate: 0.50,
    win:  { min: 1500, max: 5000 },
    lose: { min: 500,  max: 3000 },
  },

  // Robo a otro usuario
  rob: {
    successRate: 0.35,
    minTarget:   200,
    maxStealRate: 0.30,
    fine: { min: 300, max: 1200 },
  },

  // Tragamonedas
  slots: {
    symbols: ['🍒', '🍋', '🍊', '🍇', '⭐', '💎'],
    // multiplicadores cuando los 3 coinciden
    multipliers: { '💎': 10, '⭐': 5, '🍇': 3, '🍊': 2, '🍋': 1.5, '🍒': 1.2 },
    // 2 iguales siempre devuelve la mitad de la apuesta
    twoMatchMultiplier: 0.5,
    minBet: 100,
  },

  // Cara o cruz
  coinflip: {
    minBet: 50,
  },

  // Formatea una cantidad con el emoji y nombre de la moneda
  fmt(amount) {
    const { emoji, name } = config.currency;
    return `${emoji} **${Math.abs(Math.round(amount)).toLocaleString('es-ES')} ${name}**`;
  },

  // Genera un número aleatorio entre min y max (inclusive)
  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};
