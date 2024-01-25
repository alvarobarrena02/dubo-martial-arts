const express = require('express');
const https = require('https');
const fs = require('fs');
const app = express();
// const PORT = process.env.PORT || 3001;
const HTTPS_PORT = process.env.HTTPS_PORT || 3000;  // Puerto para HTTPS

// Configurar middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Definir redirecciones
app.get('/', (req, res) => {
    res.redirect('index.html');
});

app.get('/clases', (req, res) => {
    res.redirect('clases.html');
});

app.get('/instructores', (req, res) => {
    res.redirect('instructores.html');
});

app.get('/contacto', (req, res) => {
    res.redirect('contacto.html');
});

app.get('/login', (req, res) => {
    res.redirect('login.html');
});

// Cargar archivos del certificado y clave
const privateKey = fs.readFileSync('cert/Hito1.key', 'utf8');
const certificate = fs.readFileSync('cert/Hito1.crt', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// Crear un servidor HTTPS
const httpsServer = https.createServer(credentials, app);

// Manejo de errores
httpsServer.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`El puerto ${HTTPS_PORT} está en uso, elige otro puerto.`);
    } else {
        console.error('Error en el servidor HTTPS:', error);
    }
    process.exit(1); // Sale del proceso si hay un error crítico
});

// Manejo de eventos
httpsServer.on('listening', () => {
    console.log(`Servidor Express escuchando en el puerto HTTPS ${HTTPS_PORT}`);
});

// Escuchar en el puerto HTTPS
httpsServer.listen(HTTPS_PORT);
