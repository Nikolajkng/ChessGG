// Global variables:
let clickCount = 0;

const switchPlayerTurn = () => {
    playerTurn = (clickCount % 2 === 0) ? "White" : "Black"
    lockBoard();   // Lock my board after my turn is over
    socket.emit("player-turn", playerTurn)  // Signal other players turn
}

// Onclick function of buttons:
const onClick = (btn, x, y) => {
    btn.addEventListener('click', () => {
        highlightPlayerMenu();

        // Selection logic:
        selectedCell(btn, x, y);
        let sX = selectedX;
        let sY = selectedY;

        // (1) Send move-attempt to server / rulechecker:
        const sValue = selectedValue;
        const tValue = btn.getAttribute("value");
        const turn = playerTurn;

        let moveDetected = Math.abs(sX - x) != 0 || Math.abs(sY - y) != 0
        if (moveDetected) {
            socket.emit('move-attempt', {
                turn,
                sValue,
                tValue,
                sX,
                sY,
                x,
                y
            });
            console.log("move-attempt sent to server...")
        }

        

        // Info for debug:
        console.log('Coordinates: ' + "(" + x + ", " + y + ")");
        console.log('Value: ' + btn.getAttribute("value"));
        console.log("#################################################")
    })
}
