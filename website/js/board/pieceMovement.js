// Global variables:
let canSelect = true;
let selectedPos = "";
let selectedX = -1;
let selectedY = -1;
let selectedBtn = null;
let clickCount = 0;
let playerTurn = null;
let isLegalMove = null;


// Function to get the correct piece symbol based on the piece value
function getPieceSymbol(value){
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

        // Move piece logic:
        moveChecker(btn, x, y);


        // Info for debug:
        console.log('Coordinates: ' + "(" + x + ", " + y + ")");
        console.log('Value: ' + btn.getAttribute("value"));
        console.log('Selected: ' + btn.getAttribute("selected"));
        console.log("#################################################")
    })
}

const placeNewPiece = (targetBtn) =>{
    const newPieceFigure = document.createElement("span");
    newPieceFigure.style.cssText = " font-size:"+pieceSize+";"
    newPieceFigure.textContent = getPieceSymbol(selectedBtn.getAttribute("value"));
    targetBtn.appendChild(newPieceFigure);
}

const swapPieceValue = (myBtn, targetBtn) =>{
    var tempSelect = myBtn.getAttribute("value");
    myBtn.setAttribute("value", "none");
    targetBtn.setAttribute("value", tempSelect);
}


// Check for game rules:
const moveChecker = (targetBtn, x, y) => {

    // Check if move is legal
    isLegalMove = legalMove(selectedBtn, targetBtn);
    let moveDetected = Math.abs(selectedX - x) != 0 || Math.abs(selectedY - y) != 0

    if (moveDetected && isLegalMove) {
        // Remove highlight on movement on oldPos:
        removeHighlight();

        // Swap piece position and set their coordinates accordingly:
        confirmMove(selectedBtn, targetBtn);

        console.log("Player move legal: " + isLegalMove)
        console.log("Player turn over for: " + playerTurn);
        console.log("Total click count: " + clickCount);
    }
}


// Confirm when a player has ended their turn
const confirmMove = (myBtn, targetBtn) => {

    // If the selected cell is a legal cell according to playerturn
    if (myBtn != null) {

        // Clear selected piece from board
        removePieceTrail(myBtn);

        // Place selected piece on target: 
        placeNewPiece(targetBtn);


        // Sends data on piece movement to server
        const value = myBtn.getAttribute("value");
        const x = myBtn.getAttribute("x");
        const y = myBtn.getAttribute("y");
        const tX = targetBtn.getAttribute("x");
        const tY = targetBtn.getAttribute("y");
        socket.emit('piece-move', {value, x, y, tX, tY});


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