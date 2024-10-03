// Global variables:
let clickCount = 0;
let playerTurn = null;


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

// Onclick function of buttons:
const onClick = (btn, x, y) => {
    btn.addEventListener('click', () => {

        // Selection logic:
        selectedCell(btn, x, y);

        // Checks that "the move is legal" && "self-select does not count as move"
        let moveDetected = Math.abs(selectedX - x) != 0 || Math.abs(selectedY - y) != 0  
        if (legalMove(selectedBtn, btn) && moveDetected) {
            // Remove highlight on movement on oldPos:
            removeHighlight();

            // Swap piece position and set their coordinates accordingly:
            confirmMove(selectedBtn, btn);

            console.log("Player turn over for: " + playerTurn);
            console.log("Total click count: " + clickCount);
        }

        // Info for debug:
        console.log('Coordinates: ' + "(" + x + ", " + y + ")");
        console.log('Value: ' + btn.getAttribute("value"));
        console.log('Selected: ' + btn.getAttribute("selected"));
        console.log("#################################################")
    })
}

const placeNewPiece = (targetBtn) => {
    const newPieceFigure = document.createElement("span");
    newPieceFigure.style.cssText = " font-size:" + pieceSize + ";"
    newPieceFigure.textContent = getPieceSymbol(selectedBtn.getAttribute("value"));
    targetBtn.appendChild(newPieceFigure);
}

const swapPieceValue = (myBtn, targetBtn) => {
    var tempSelect = myBtn.getAttribute("value");
    myBtn.setAttribute("value", "none");
    targetBtn.setAttribute("value", tempSelect);
    
}



// Confirm when a player has ended their turn
const confirmMove = (myBtn, targetBtn) => {
    console.log("Legal is true!")
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
        transmitPieceMovement(myBtn.getAttribute("value"), x, y, tX, tY)
 
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