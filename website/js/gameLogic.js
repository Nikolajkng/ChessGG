// Global variables:
let canSelect = true;
let selectedPos = "";
let selectedX = -1;
let selectedY = -1;
let selectedBtn = null;
let clickCount = 0;
let playerTurn = null;


// Functions:

// Function to get the correct piece symbol based on the piece value
const getPieceSymbol = (value) => {
    switch (value) {
        case "whiteP": return "♙";
        case "whiteK": return "♔";
        case "whiteQ": return "♕";
        case "whiteR": return "♖";
        case "whiteB": return "♗";
        case "whiteN": return "♘";
        case "blackP": return "♟";
        case "blackK": return "♚";
        case "blackQ": return "♛";
        case "blackR": return "♜";
        case "blackB": return "♝";
        case "blackN": return "♞";
        case "none": return "";
    }
}

const confirmMove = (targetBtn) => {

    if(selectedBtn != null){
        // Remove selected piece from board
        const oldPieceFigure = selectedBtn.querySelector("span");  //selects first element of type "span"
        selectedBtn.removeChild(oldPieceFigure);

        // Place selected piece on target: 
        const newPieceFigure = document.createElement("span");
        newPieceFigure.textContent = getPieceSymbol(selectedBtn.getAttribute("value"));
        targetBtn.appendChild(newPieceFigure);


        // Update the values on pieces
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

const removeHighlight = () => {
    if(selectedBtn != null){
    selectedBtn.classList.remove('highlight');
    selectedBtn.setAttribute('selected', 'no');
    canSelect = true;
    }
}

const selectedCell = (btn, x, y) => {
    cellType = btn.getAttribute('value');

    // TODO:
    // for 2 player (Check who is playing, host or client, and correct the "include.white")
    if(clickCount % 2 == 0){
        playerTurn = "White";
    } else {
        playerTurn = "Black";
    }

    if(playerTurn == "White"){
        // Ensures selection is only possible: 1) on cells with pieces 2) WHITE pieces
        if (canSelect && cellType != 'none' && (btn.getAttribute('value').includes('white'))) {
            selectedBtn = btn;
            selectedX = x;
            selectedY = y;
            selectedPos = selectedX + "" + selectedY;
            btn.setAttribute('selected', 'yes')
            btn.classList.add('highlight');
            canSelect = false;
        } 
        // Remove selection only when clicking on same selected cell
        else if (!canSelect && selectedPos == (x + "" + y)) {
            removeHighlight();
            selectedBtn = null;
        }
    } else {
         // Ensures selection is only possible: 1) on cells with pieces 2) BLACK pieces
        if (canSelect && cellType != 'none' && (btn.getAttribute('value').includes('black'))) {
            selectedBtn = btn;
            selectedX = x;
            selectedY = y;
            selectedPos = selectedX + "" + selectedY;
            btn.setAttribute('selected', 'yes')
            btn.classList.add('highlight');
            canSelect = false;
        } 
        // Remove selection only when clicking on same selected cell
        else if (!canSelect && selectedPos == (x + "" + y)) {
            removeHighlight();
            selectedBtn = null;
        }
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
        console.log('Coordinates: ' + "("+x+", "+y+")");
        console.log('Value: ' + btn.getAttribute("value"));
        console.log('Selected: ' + btn.getAttribute("selected"));
        console.log("#################################################")
    })
}

// Move piece
const movePiece = (btn, x, y) => {

    // TO DO:
    // Check if move is legal

    let moveDetected = Math.abs(selectedX - x) != 0 || Math.abs(selectedY - y) != 0 

    if(moveDetected){
        // Remove highlight on movement on oldPos:
        removeHighlight();

        // Swap piece position and set their coordinates accordingly:
        confirmMove(btn);

        
        console.log("Player turn over for: " + playerTurn);
        console.log("Total click count: " + clickCount);
    } 
    
}
