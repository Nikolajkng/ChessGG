/////////////////////// imports //////////////////////////
const port = 6969;
const players = {};

const path = require('path')
const express = require('express');
const {
    exec
} = require('child_process');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json);
const server = require('http').createServer(app);
const io = require('socket.io')(server);


//////////////////////// setup /////////////////////////////////

// Links the server to HTML file:
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../website', 'index.html'))
});

// Handles all static files in website folder (such as .css):
app.use(express.static(path.join(__dirname, '../website')));


// Triggers a series of actions and channel-listeners on client connection:
io.on('connection', (socket) => {

    // Listening for new players...
    socket.on('new-player', playerName => {
        players[socket.id] = playerName;
        socket.broadcast.emit('user-connected', playerName);
    })

    // Listening for new chat messages...
    socket.on('send-chat-message', message => {
        // Send to all clients
        socket.broadcast.emit('chat-message', {
            message: message,
            playerName: players[socket.id]
        });


    })


    // Disconnection handler
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', players[socket.id]);
        delete players[socket.id];
    })

})

app.post("/super-secret-reload", async (req, res) => {
    console.log("RELOADING with body", req.body);
    res.sendStatus(200);
    exec("git pull");

})



// Server checks:
server.listen(port, function () {
    console.log(`Server running at http://localhost:${port}/`);

});