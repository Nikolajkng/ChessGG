// Export the whole socket to server.js
module.exports = (server) => {

    // Import the legalMove()
    const {
        legalMove
    } = require('./game-rules/legalMove.js');
    const {
        resetGameArray
    } = require('./game-rules/legalMove.js');


    //////////////////////// Socket.io setup /////////////////////////////////
    const io = require('socket.io')(server);
    const players = {};
    let socketID = [];


    io.on('connection', (socket) => {

        // Listening for new players...
        socket.on('new-player', playerName => {
            players[socket.id] = playerName;
            socketID.push(socket.id);
            socket.broadcast.emit('user-connected', playerName);
            socket.broadcast.emit("new-user-list", Object.values(players));
            console.log("Current players' socket.id in-game: [" + socketID + "]");
            
            // Start game for both clients when enough players
            if(socketID.length === 2){
                io.emit('start-game', "starting game...");
            }
        });


        // PT-3: Signal to the right client whose turn it is (initially always white):
        socket.on('player-turn', turn => {
            if (turn === "White") {
                socket.broadcast.to(socketID[0]).emit('your-turn');
            } else {
                socket.broadcast.to(socketID[1]).emit('your-turn');
            }
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
            let moveType = "";

            // Identify move-attempt as move || capture
            if (data.tValue.includes("none")) {
                moveType = "move";
            } else {
                moveType = "capture"
            }

            // Transmit the move to ALL clients
            if (legalMove(data.sX, data.sY, data.x, data.y, data.sValue, data.tValue, data.turn, moveType)) {
                io.emit('legal-move', {
                    turn: data.turn,
                    sValue: data.sValue,
                    tValue: data.tValue,
                    sX: data.sX,
                    sY: data.sY,
                    tX: data.x,
                    tY: data.y
                })
            } else {
                // Transmit the error sound ONLY to client
                socket.emit('illegal-move', {
                    // Update nothing
                });
            }

        });


        // Disconnection handler
        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', players[socket.id]);
            socket.broadcast.emit("new-user-list", Object.values(players));
            delete players[socket.id];
            delete socketID.splice(socket.id, 1);

            //Reset gameboard:
            resetGameArray();
        });
    });

    return io;
};