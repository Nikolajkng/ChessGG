// Global variables:
let clickCount = 0;
let playerTurn = "White"; //always starts

const switchPlayerTurn = () => {
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

// Move piece
function movePiece(sX, sY, tX, tY, turn) {
    let sBtn = document.getElementById("button\(" + sX + "," + sY + "\)")
    let tBtn = document.getElementById("button\(" + tX + "," + tY + "\)")
    console.log("Moving " + sBtn.getAttribute("value") + " to " + tBtn.getAttribute("value"))

    // Updates pieces on board for everyone: 
    removeOldPiece(sBtn);
    placeNewPiece(sBtn, tBtn);
    swapPieceValue(sBtn, tBtn);

    // Confirms move and switch turn:
    clickCount++;
    selectedBtn = null;
    switchPlayerTurn();
}



function placeNewPiece(sBtn, tBtn) {
    const newPieceFigure = document.createElement("span");
    newPieceFigure.style.cssText = " font-size:" + pieceSize + ";"
    newPieceFigure.textContent = getPieceSymbol(sBtn.getAttribute("value"));
    tBtn.innerHTML = ''; // Clear previous piece
    tBtn.appendChild(newPieceFigure);
}


function swapPieceValue(myBtn, targetBtn) {
    const myBtnValue = myBtn.getAttribute("value");
    myBtn.setAttribute("value", "none");
    targetBtn.setAttribute("value", myBtnValue);

}

function removeOldPiece(sBtn) {
    sBtn.innerHTML ="";
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