const Router = require('express').Router;
const os = require('os');
const { ifTokenExisteNext, verifyTokenJWT, isAdmin } = require('../middlewares/auth-strategies');
const yargArgs = require('../utils/yarg-cli');


const routerInfo = Router();

routerInfo.get('/info', (req, res) => {
    const PORT = req.socket.localPort;
    const infoProyecto = {
        argumentos: process.argv, // "Argumentos de entrada"
        plataforma: process.platform, // "Nombre de la plataforma"
        versionNode: process.version, // "Versión de Node.js"
        pathEjecucion: process.execPath, // "Path de ejecución"
        memoriaTotalReservada: Math.floor(process.memoryUsage().rss / (1024 * 1024)), // "Memoria total de reservada"
        processId: process.pid, // "Process ID": process.pid,
        directorioActualTrabajo: process.cwd(), // "Directorio actual del trabajo",
        numProcesadores: os.cpus().length, // "Número de procesadores"
        PORT: PORT,
    };
    res.render('info', { title: "Info" , infoProyecto});
});

routerInfo.get('/options', ifTokenExisteNext ,verifyTokenJWT , isAdmin, (req, res) => {
    const PORT = req.socket.localPort;
    const options = {
        PORT: PORT,
        tokenExpiringTime: process.env.JWT_EXPIRE_IN,
        emailSite: process.env.GMAIL_ADRESS,
        persistence : process.env.DB_HOST
    };
    res.render('options', { title: "Options" , options});
});


module.exports = routerInfo;