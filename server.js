require('dotenv').config();

const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');

const yargArgs = require('./src/utils/yarg-cli.js');
const cluster = require('cluster');
const os = require('os');

const compression = require('compression');
const { logger, loggerWarn, loggerError } = require('./src/logs/winston.js');

const webSockets = require('./src/utils/webSockets')

const routerInfo = require('./src/routes/info.js');
const apiRouter = require('./src/routes/index.js');
const routerGraphql = require('./src/graphql/index.js');

const morgan = require('morgan');

const app = express();
const httpServer = new HttpServer(app)
const ioServer = new IOServer(httpServer)

app.use(compression())

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/api/js", express.static("public/js"));

app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		defaultLayout: 'main.hbs',
		partialsDir: './public/views/partial/'
	})
);

app.set('views', './public/views');
app.set('view engine', 'hbs');


app.use(morgan('dev'))


app.use(apiRouter);

app.use(routerGraphql)

// Info server
app.use(routerInfo);

// Mostrar nuevos msjs y prods
webSockets.scocketMsjAndProd(ioServer)


// Rutas inexistentes, logger Warnings
app.use((req, res) => {
	loggerWarn.log("warn", `Ruta ${req.originalUrl} y metodo ${req.method} no implementada - fyh: ${new Date().toLocaleString()} `)
	res.status(404).send({
		error: -2,
		descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no implementada`,
	});
});

// Ataja errores, logger Errores
app.use((error, req, res, next) => {
	loggerError.log("error", error);
	res.status(500).send(error.message);
});

const PORT = process.env.PORT || yargArgs.puerto;
const MODO = yargArgs.modo;
const nroCPUs = os.cpus().length;


if (MODO !== 'FORK' && MODO !== 'CLUSTER') {
	new Error(loggerError.log("error", `Modo ${MODO} no implementado, usando FORK`));
};

if (MODO === 'CLUSTER' && cluster.isPrimary) {
	for (let i = 0; i < nroCPUs; i++) {
		cluster.fork();
	}
	cluster.on('online', (worker) => {
		logger.log('info', `Worker PID: ${worker.process.pid} is alive`);
	});
	cluster.on('exit', (worker) => {
		logger.log("warn", `Worker PID: ${worker.process.pid} died`);
	});
} else {
	httpServer.listen(PORT, () => {
		logger.log(
			"info",
			`Escuchando en el Puerto: ${httpServer.address().port} - MODO: ${MODO} - PID: ${process.pid} - fyh: ${new Date().toLocaleString()}`
		);
	});
	httpServer.on("error", (error) => loggerError.log("error", error));
};