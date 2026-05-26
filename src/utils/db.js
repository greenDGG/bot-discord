const { QuickDB } = require('quick.db');
const path = require('path');
const fs   = require('fs');

const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const prefixDB  = new QuickDB({ filePath: path.join(dataDir, 'prefix.sqlite') });
const economyDB = new QuickDB({ filePath: path.join(dataDir, 'economy.sqlite') });
const levelsDB  = new QuickDB({ filePath: path.join(dataDir, 'levels.sqlite') });
const warnsDB   = new QuickDB({ filePath: path.join(dataDir, 'warns.sqlite') });

module.exports = { prefixDB, economyDB, levelsDB, warnsDB };
