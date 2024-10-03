// Fetch the "server" object from server.js
module.exports = (server) => {

    //////////////////////// Socket.io setup /////////////////////////////////
    const io = require('socket.io')(server);
    const players = {};

    io.on('connection', (socket) => {

        // Listening for new players...
        socket.on('new-player', playerName => {
            players[socket.id] = playerName;
            socket.broadcast.emit('user-connected', playerName);
            socket.broadcast.emit("new-user-list", Object.values(players));
        });

        // Listening for new chat messages...
        socket.on('send-chat-message', message => {
            // Send to all clients
            socket.broadcast.emit('chat-message', {
                message: message,
                playerName: players[socket.id]
            });
        });


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
        });

        // Disconnection handler
        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', players[socket.id]);
            socket.broadcast.emit("new-user-list", Object.values(players));
            delete players[socket.id];
        });
    });

    return io;
};