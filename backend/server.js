/////////////////////// imports //////////////////////////
const hostname = '127.0.0.1';
const port = 6969;

const path = require('path')
const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);


//////////////////////// setup /////////////////////////////////

// Links the server to HTML file:
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../website', 'index.html'))
});

// Handles all static files in website folder (such as .css):
app.use(express.static(path.join(__dirname, '../website')));


// Trigger an series of actions on connection:
io.on('connection', (socket) => {
    console.log('user connected');
    socket.emit('connection', {message: 'a new client connected'});


    // Disconnection handler
    socket.on('disconnection', function () {
        console.log("user disconnected");
    })

})


// Server checks:
server.listen(port, function () {
    console.log(`Server running at http://${hostname}:${port}/`);

});