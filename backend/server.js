/////////////////////// imports //////////////////////////
const port = 6969;
const players = {};

const path = require('path')
const http = require('http')
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const {
    exec
} = require('child_process');


//////////////////////// EXPRESS setup /////////////////////////////////

// Links the server to HTML file:
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../website', 'index.html'))
});

// Handles all static files in website folder (such as .css):
app.use(express.static(path.join(__dirname, '../website')));


// Webhook that responds on "git push"
app.post("/super-secret-reload", async (req, res) => {
    console.log("RELOADING with body", req.body);
    res.sendStatus(200);
    exec("git pull");

})

//////////////////////// Socket.io setup /////////////////////////////////

io.on('connection', (socket) => {

    // Listening for new players...
    socket.on('new-player', playerName => {
        players[socket.id] = playerName;
        socket.broadcast.emit('user-connected', playerName);
        socket.broadcast.emit("new-user-list", Object.values(players));
    })

    // Listening for new chat messages...
    socket.on('send-chat-message', message => {
        // Send to all clients
        socket.broadcast.emit('chat-message', {
            message: message,
            playerName: players[socket.id]
        });
    })


    // Listening for piece movements ...
    socket.on('piece-moved', data => {
        socket.broadcast.emit('piece-has-moved', {
            sValue: data.sValue,
            tValue: data.tValue,
            x: data.x,
            y: data.y,
            tX: data.tX,
            tY: data.tY
        });
    })

    // Disconnection handler
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', players[socket.id]);
        socket.broadcast.emit("new-user-list", Object.values(players));
        delete players[socket.id];
    })
})


// Server checks:
server.listen(port, function () {
    console.log(`Server running at http://localhost:${port}/`);

});