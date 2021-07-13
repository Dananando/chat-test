// Require and setup of express
const express = require('express');
const app = express();
// Require of http and creation of a http server connected to express
const http = require('http');
const server = http.createServer(app);

// Setup of socket.io
const { Server } = require('socket.io');
const io = new Server(server);

// Router
const router = require('./app/router');

// dotenv to use the .env file
require('dotenv').config();
const PORT = process.env.PORT || 4444;

// Indicate where the static files (.css, .html etc.) are located
app.use(express.static(__dirname + '/static'));

// Using the routes (the url name will start by 'v1')
app.use('/v1', router);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port n°${PORT}`);
});