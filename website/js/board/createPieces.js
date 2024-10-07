// Local variables:
let cellSize = 100;
const pieceSize = "70px";

// Style of buttons:
const setCellSize = (newButton) => {
    newButton.style.width = cellSize + "px";
    newButton.style.height = cellSize + "px";
    newButton.style.padding = 0 + "px";
    newButton.style.margin = 0 + "px";
}
// Set value of cells:
const setInitialPieceValues = (btn, x, y) => {

    // Pawns
    if (x == 6) {
        btn.setAttribute("value", "whiteP");
    } else if (x == 1) {
        btn.setAttribute("value", "blackP");
    }
    // Rooks
    else if ((x == 7 && y == 0) || (x == 7 && y == 7)) {
        btn.setAttribute("value", "whiteR");
    } else if ((x == 0 && y == 0) || (x == 0 && y == 7)) {
        btn.setAttribute("value", "blackR");
    }
    // Knights
    else if ((x == 7 && y == 1) || (x == 7 && y == 6)) {
        btn.setAttribute("value", "whiteN");
    } else if ((x == 0 && y == 1) || (x == 0 && y == 6)) {
        btn.setAttribute("value", "blackN");
    }
    // Bishops
    else if ((x == 7 && y == 2) || (x == 7 && y == 5)) {
        btn.setAttribute("value", "whiteB");
    } else if ((x == 0 && y == 2) || (x == 0 && y == 5)) {
        btn.setAttribute("value", "blackB");
    }
    // Queen
    else if (x == 7 && y == 3) {
        btn.setAttribute("value", "whiteQ");
    } else if (x == 0 && y == 3) {
        btn.setAttribute("value", "blackQ");
    }
    // King
    else if (x == 0 && y == 4) {
        btn.setAttribute("value", "blackK");
    } else if (x == 7 && y == 4) {
        btn.setAttribute("value", "whiteK");
    }
    // Error handling to console
    else {
        btn.setAttribute("value", "none");
    }
}



// Place all initial pieces based on their values:
const setInitialPieces = (btn) => {
    var pieceSymbol = document.createElement("span");
    var value = btn.getAttribute('value');
    pieceSymbol.style.cssText = " font-size:" + pieceSize + ";"

    if (value === "none") {
        return;
    }
    switch (value) {
        case "whiteP":
            pieceSymbol.textContent = "🐒";
            break;
        case "whiteK":
            pieceSymbol.textContent = "♔";
            break;
        case "whiteQ":
            pieceSymbol.textContent = "♕";
            break;
        case "whiteR":
            pieceSymbol.textContent = "🦏";
            break;
        case "whiteB":
            pieceSymbol.textContent = "♗";
            break;
        case "whiteN":
            pieceSymbol.textContent = "♘";
            break;
        case "blackP":
            pieceSymbol.textContent = "♟";
            break;
        case "blackK":
            pieceSymbol.textContent = "♚";
            break;
        case "blackQ":
            pieceSymbol.textContent = "♛";
            break;
        case "blackR":
            pieceSymbol.textContent = "🦏";
            break;
        case "blackB":
            pieceSymbol.textContent = "🐒";
            break;
        case "blackN":
            pieceSymbol.textContent = "♞";
            break;
    }
    btn.appendChild(pieceSymbol);
}