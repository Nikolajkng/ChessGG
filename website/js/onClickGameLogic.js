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
const getPieceSymbol = (value) => {
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


const removeHighlight = () => {
    if (selectedBtn != null) {
        selectedBtn.classList.remove('highlight');
        selectedBtn.setAttribute('selected', 'no');
        canSelect = true;
    }
}

const playerTurnHighlight = () => {

    let whiteMenu = document.getElementById("whiteMenu");
    let blackMenu = document.getElementById("blackMenu");
    if (playerTurn === "White") {
        whiteMenu.classList.remove("whiteMenuDisable");
        whiteMenu.classList.add("whiteMenuEnable");
        blackMenu.classList.remove("blackMenuEnable");
        blackMenu.classList.add("blackMenuDisable");
    } else if (playerTurn === "Black") {
        blackMenu.classList.remove("blackMenuDisable");
        blackMenu.classList.add("blackMenuEnable");
        whiteMenu.classList.remove("whiteMenuEnable");
        whiteMenu.classList.add("whiteMenuDisable");

    }
}

const selectedCell = (btn, x, y) => {
    cellType = btn.getAttribute('value');

    // Player turn logic:
    if (clickCount % 2 === 0) {
        playerTurn = "White";
    } else {
        playerTurn = "Black";
    }
    playerTurnHighlight();


    // WHITE PLAYER TURN //
    if (playerTurn === "White") {
        const hasWhitePiece = cellType.includes("white");
        // Ensures selection is only possible: 1) on cells with pieces, 2) only select WHITE pieces
        if (canSelect && cellType != 'none' && hasWhitePiece) {
            selectedBtn = btn;
            selectedX = x;
            selectedY = y;
            selectedPos = selectedX + "" + selectedY;
            btn.setAttribute('selected', 'yes');
            btn.classList.add('highlight');
            canSelect = false;
        }
        // Remove selection only by re-select same cell
        else if (!canSelect && selectedPos == (x + "" + y)) {
            removeHighlight();
            selectedBtn = null;
        } else {
            // TO DO: add chess illegal move sound

            console.error("Error: Selectedbtn === null -> Cause: (1): not your turn, (2): not your pieces");
        }
        // BLACK PLAYER TURN //
    } else{
        const hasBlackPiece = cellType.includes("black");
        // Ensures selection is only possible: 1) on cells with pieces, 2) only select BLACK pieces
        if (canSelect && cellType != 'none' && hasBlackPiece) {
            selectedBtn = btn;
            selectedX = x;
            selectedY = y;
            selectedPos = selectedX + "" + selectedY;
            btn.setAttribute('selected', 'yes');
            btn.classList.add('highlight');
            canSelect = false;
        }
        // Remove selection only by re-select same cell
        else if (!canSelect && selectedPos == (x + "" + y)) {
            removeHighlight();
            selectedBtn = null;
        } else {
            // TO DO: add chess illegal move sound
            
            console.error("Error: Selectedbtn === null -> Cause: (1): not your turn, (2): not your pieces");
        }
    }
}

const removePieceTrail = (oldPieceBtn) => {
    while (oldPieceBtn.firstChild) {
        oldPieceBtn.removeChild(oldPieceBtn.firstChild);
    }
}

const placeNewPiece = (targetBtn) =>{
    const newPieceFigure = document.createElement("span");
    newPieceFigure.style.cssText = " font-size:"+pieceSize+";"
    newPieceFigure.textContent = getPieceSymbol(selectedBtn.getAttribute("value"));
    targetBtn.appendChild(newPieceFigure);
}

// Confirm when a player has ended their turn
const confirmMove = (targetBtn) => {

    // If the selected cell is a legal cell according to playerturn
    if (selectedBtn != null) {

        // Clear selected piece from board
        removePieceTrail(selectedBtn);

        // Place selected piece on target: 
        placeNewPiece(targetBtn);


        // Update the values on pieces by swapping
        var tempSelect = selectedBtn.getAttribute("value");
        selectedBtn.setAttribute("value", targetBtn.getAttribute("value"));
        targetBtn.setAttribute("value", tempSelect);

        // Move is finished:
        clickCount++;


    } else {
        console.error("illegal cell selection");
    }

    // Reset selection to none after move is done:
    selectedBtn = null;
}


// Move piece
const movePiece = (targetBtn, x, y) => {

    // Check if move is legal
    isLegalMove = legalMove(selectedBtn, targetBtn);
    let moveDetected = Math.abs(selectedX - x) != 0 || Math.abs(selectedY - y) != 0

    if (moveDetected && isLegalMove) {
        // Remove highlight on movement on oldPos:
        removeHighlight();

        // Swap piece position and set their coordinates accordingly:
        confirmMove(targetBtn);

        console.log("Player move legal: " + isLegalMove)
        console.log("Player turn over for: " + playerTurn);
        console.log("Total click count: " + clickCount);
    }

}


// Onclick function of buttons:
const onClick = (btn, x, y) => {
    btn.addEventListener('click', () => {

        // Selection logic:
        selectedCell(btn, x, y);

        // Move piece logic (TODO):
        movePiece(btn, x, y);

        // Remove piece logic (TODO):


        // Info for debug:
        console.log('Coordinates: ' + "(" + x + ", " + y + ")");
        console.log('Value: ' + btn.getAttribute("value"));
        console.log('Selected: ' + btn.getAttribute("selected"));
        console.log("#################################################")
    })
}