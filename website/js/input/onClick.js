// Global variables:
let clickCount = 0;
let playerTurn = "White"; //always starts

const switchPlayerTurn = () =>{
    playerTurn = (clickCount % 2 === 0) ? "White" : "Black"
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
        const turn = playerTurn;

        let moveDetected = Math.abs(sX - x) != 0 || Math.abs(sY - y) != 0
        if (moveDetected) {
            socket.emit('move-attempt', {
                turn,
                sValue,
                sX,
                sY,
                x,
                y
            });
            console.log("move-attempt sent to server...")
        }

        // (2) Await move-attempt response from server:
        socket.on('legal-move', data => {
            console.log("attempt-move: Accepted!")
            movePiece(data.sX, data.sY, data.tX, data.tY, data.turn);

        });

        socket.on('illegal-move', () => {
            console.log("attempt-move: REJECTED!")
        });

        // Info for debug:
        console.log('Coordinates: ' + "(" + x + ", " + y + ")");
        console.log('Value: ' + btn.getAttribute("value"));
        console.log("#################################################")
    })
}

// Move piece
function movePiece(sX, sY, tX, tY, turn) {
    let sBtn = document.getElementById("button\(" + sX + "," + sY + "\)")
    let tBtn = document.getElementById("button\(" + tX + "," + tY + "\)")
    console.log("Moving " + sBtn.getAttribute("value") + " to " + tBtn.getAttribute("value"))
    
    // Confirms move and switch turn:
    clickCount++;
    selectedBtn = null;
    console.log("updated clickcount: "+ clickCount);
    switchPlayerTurn();
    console.log("next turn is: " + playerTurn)
}



const placeNewPiece = (targetBtn) => {
    const newPieceFigure = document.createElement("span");
    newPieceFigure.style.cssText = " font-size:" + pieceSize + ";"
    newPieceFigure.textContent = getPieceSymbol(selectedBtn.getAttribute("value"));
    targetBtn.innerHTML = ''; // Clear previous piece
    targetBtn.appendChild(newPieceFigure);
}

const swapPieceValue = (myBtn, targetBtn) => {
    const myBtnValue = myBtn.getAttribute("value");
    myBtn.setAttribute("value", "none");
    targetBtn.setAttribute("value", myBtnValue);

}


// Confirm when a player has ended their turn
const confirmMove = (myBtn, targetBtn) => {
    // If the selected cell is a legal cell according to playerturn
    if (myBtn != null) {

        // Clear selected piece from board
        removePieceTrail(myBtn);

        // Place selected piece on target: 
        placeNewPiece(targetBtn);


        // Transmit all piece movements (TEMPORARY, move this inside all the pieceRules):
        const x = parseInt(myBtn.getAttribute("x"));
        const y = parseInt(myBtn.getAttribute("y"));
        const tX = parseInt(targetBtn.getAttribute("x"));
        const tY = parseInt(targetBtn.getAttribute("y"));
        transmitPieceMove(selectedBtn.getAttribute("value"), targetBtn.getAttribute("value"), x, y, tX, tY)

        // Update the values on pieces by swapping
        swapPieceValue(myBtn, targetBtn);


        // Move is finished:
        clickCount++;

    } else {
        console.error("illegal cell selection");
    }

    // Reset selection to none after move is done:
    selectedBtn = null;
}

// Function to get the correct piece symbol based on the piece value
function getPieceSymbol(value) {
    switch (value) {
        case "whiteP":
            return "♙";
        case "whiteK":
            return "♔";
        case "whiteQ":
            return "♕";
        case "whiteR":
            return "♖";
        case "whiteB":
            return "♗";
        case "whiteN":
            return "♘";
        case "blackP":
            return "♟";
        case "blackK":
            return "♚";
        case "blackQ":
            return "♛";
        case "blackR":
            return "♜";
        case "blackB":
            return "♝";
        case "blackN":
            return "♞";
        case "none":
            return "";
    }
}