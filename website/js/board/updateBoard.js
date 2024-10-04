
// Move piece
function updateBoard(sX, sY, tX, tY, turn) {
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