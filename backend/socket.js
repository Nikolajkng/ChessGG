// Export the whole socket to server.js
module.exports = (server) => {
    // Import the legalMove() from ruleChecker.js
    const {legalMove} = require('./game-rules/ruleChecker.js');

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

        // Listening for move-attempt:
        socket.on('move-attempt', data => {
            if (legalMove(data.sX, data.sY, data.x, data.y, data.sValue, data.turn)) {
                io.emit('legal-move', {
                    turn: data.turn,
                    sValue: data.sValue,
                    sX: data.sX,
                    sY: data.sY,
                    tX: data.x,
                    tY: data.y
                })
            } else {
                io.emit('illegal-move', {
                    // Update nothing
                });
            }

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