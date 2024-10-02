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
    btn.setAttribute("selected", "no")

    // Pawns
    if (x == 7) {
        btn.setAttribute("value", "whiteP");
        chessBoard[x-1][y-1] = "whiteP";
    } else if (x == 2) {
        btn.setAttribute("value", "blackP");
        chessBoard[x-1][y-1] = "blackP";
    }
    // Rooks
    else if ((x == 8 && y == 1) || (x == 8 && y == 8)) {
        btn.setAttribute("value", "whiteR");
        chessBoard[x-1][y-1] = "whiteR";
    } else if ((x == 1 && y == 1) || (x == 1 && y == 8)) {
        btn.setAttribute("value", "blackR");
        chessBoard[x-1][y-1] = "blackR";

    }
    // Knight
    else if ((x == 8 && y == 2) || (x == 8 && y == 7)) {
        btn.setAttribute("value", "whiteN");
        chessBoard[x-1][y-1] = "whiteN";
    } else if ((x == 1 && y == 2) || (x == 1 && y == 7)) {
        btn.setAttribute("value", "blackN");
        chessBoard[x-1][y-1] = "blackN";
    }
    // Bishop
    else if ((x == 8 && y == 3) || (x == 8 && y == 6)) {
        btn.setAttribute("value", "whiteB");
        chessBoard[x-1][y-1] = "whiteB";
    } else if ((x == 1 && y == 3) || (x == 1 && y == 6)) {
        btn.setAttribute("value", "blackB");
        chessBoard[x-1][y-1] = "blackB";
    }
    // Queen
    else if ((x == 8 && y == 4)) {
        btn.setAttribute("value", "whiteQ");
        chessBoard[x-1][y-1] = "whiteQ";
    } else if ((x == 1 && y == 4)) {
        btn.setAttribute("value", "blackQ");
        chessBoard[x-1][y-1] = "blackQ";
    }
    // King
    else if ((x == 1 && y == 5)) {
        btn.setAttribute("value", "blackK");
        chessBoard[x-1][y-1] = "blackK";
    } else if ((x == 8 && y == 5)) {
        btn.setAttribute("value", "whiteK");
        chessBoard[x-1][y-1] = "whiteK";
    }
    // Error handling to console
    else {
        btn.setAttribute("value", "none")
        chessBoard[x-1][y-1] = "none";
    }
}


// Place all initial pieces based on their values:
const setInitialPieces = (btn) => {
    var pieceSymbol = document.createElement("span");
    var value = btn.getAttribute('value');
    pieceSymbol.style.cssText = " font-size:"+pieceSize+";"

    if (value === "none") {return;}
    switch (value) {
        case "whiteP": pieceSymbol.textContent = "♙"; break;
        case "whiteK": pieceSymbol.textContent = "♔"; break;
        case "whiteQ": pieceSymbol.textContent = "♕"; break;
        case "whiteR": pieceSymbol.textContent = "♖"; break;
        case "whiteB": pieceSymbol.textContent = "♗"; break;
        case "whiteN": pieceSymbol.textContent = "♘"; break;
        case "blackP": pieceSymbol.textContent = "♟"; break;
        case "blackK": pieceSymbol.textContent = "♚"; break;
        case "blackQ": pieceSymbol.textContent = "♛"; break;
        case "blackR": pieceSymbol.textContent = "♜"; break;
        case "blackB": pieceSymbol.textContent = "♝"; break;
        case "blackN": pieceSymbol.textContent = "♞"; break;
    }
    btn.appendChild(pieceSymbol);
}
