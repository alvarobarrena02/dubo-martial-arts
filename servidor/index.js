const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const DB = require('./db.json');

const app = express();
// const PORT = process.env.PORT || 3003;
const HTTPS_PORT = process.env.HTTPS_PORT || 3001;  // Puerto para HTTPS

// Configurar CORS
app.use(cors());

app.use(express.json());

app.get('/usuarios', (req, res, next) => {
    req.DB = DB;
    return res.json(req.DB.usuarios);
});

app.get('/instructores', (req, res, next) => {
    req.DB = DB;
    return res.json(req.DB.instructores);
});

app.get('/clases', (req, res, next) => {
    req.DB = DB;
    return res.json(req.DB.clases);
});

// Cargar archivos del certificado y clave
const privateKey = fs.readFileSync('cert/hito1.key', 'utf8');
const certificate = fs.readFileSync('cert/hito1.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Crear un servidor HTTPS
const httpsServer = https.createServer(credentials, app);

// Manejo de errores
httpsServer.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`El puerto ${HTTPS_PORT} está en uso, elige otro puerto.`);
    } else {
        console.error("Error en el servidor HTTPS:", error);
    }
    process.exit(1); // Sale del proceso si hay un error crítico
});

// Manejo de eventos
httpsServer.on("listening", () => {
    console.log(`Servidor Express escuchando en el puerto HTTPS ${HTTPS_PORT}`);
});

// Escuchar en el puerto HTTPS
httpsServer.listen(HTTPS_PORT);
