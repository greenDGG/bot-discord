const timers = new Map();

// Devuelve 0 si no hay cooldown, o los segundos restantes si lo hay
function check(userId, command) {
  const key     = `${command}:${userId}`;
  const expires = timers.get(key);
  if (!expires || Date.now() >= expires) return 0;
  return Math.ceil((expires - Date.now()) / 1000);
}

function set(userId, command, ms) {
  timers.set(`${command}:${userId}`, Date.now() + ms);
}

module.exports = { check, set };
