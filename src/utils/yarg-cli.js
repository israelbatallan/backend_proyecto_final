require('dotenv').config();

const yargs = require('yargs');

const yargArgs = yargs(process.argv.slice(2)).default({
    puerto: Number(process.env.PORT) || 8080,
    debug: false,
    modo: process.env.MODO || 'FORK',
    pid: process.pid,
}).alias({
    p: "puerto",
    d: "debug",
    m: "modo",
    pid: "pid",
}).argv;

const parseado = {
    port: yargArgs.puerto,
    debug: yargArgs.debug,
    modo: yargArgs.modo,
    pid: yargArgs.pid,
    otros: yargArgs._,
};

console.log("YARGS:",parseado);

module.exports = yargArgs;