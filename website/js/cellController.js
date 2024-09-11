// Local variables:
let cellSize = 100;


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
    if (x == 7) {
        btn.setAttribute("value", "whiteP");
    } else if (x == 2) {
        btn.setAttribute("value", "blackP");
    }
    // Rooks
    else if ((x == 8 && y == 1) || (x == 8 && y == 8)) {
        btn.setAttribute("value", "whiteR");
    } else if ((x == 1 && y == 1) || (x == 1 && y == 8)) {
        btn.setAttribute("value", "blackR");
    }
    // Knight
    else if ((x == 8 && y == 2) || (x == 8 && y == 7)) {
        btn.setAttribute("value", "whiteN");
    } else if ((x == 1 && y == 2) || (x == 1 && y == 7)) {
        btn.setAttribute("value", "blackN");
    }
    // Bishop
    else if ((x == 8 && y == 3) || (x == 8 && y == 6)) {
        btn.setAttribute("value", "whiteB");
    } else if ((x == 1 && y == 3) || (x == 1 && y == 6)) {
        btn.setAttribute("value", "blackB");
    }
    // Queen
    else if ((x == 8 && y == 4)) {
        btn.setAttribute("value", "whiteQ");
    } else if ((x == 1 && y == 4)) {
        btn.setAttribute("value", "blackQ");
    }
    // King
    else if ((x == 1 && y == 5)) {
        btn.setAttribute("value", "blackK");
    } else if ((x == 8 && y == 5)) {
        btn.setAttribute("value", "whiteK");
    }
    // Error handling to console
    else {
        btn.setAttribute("value", "none")
    }

    console.log("Piece (" + x + "," + y + "): " + btn.getAttribute("value"));
}


// Place all initial pieces based on their values:
const setInitialPieces = (btn) => {
    var piece = document.createTextNode("");
    var value = btn.getAttribute('value');
    switch (value) {
        case value = "whiteP":
            piece.nodeValue = "♙";
            break;

        case value = "whiteK":
            piece.nodeValue = "♔";
            break;

        case value = "whiteQ":
            piece.nodeValue = "♕";
            break;

        case value = "whiteR":
            piece.nodeValue = "♖";
            break;

        case value = "whiteB":
            piece.nodeValue = "♗";
            break;

        case value = "whiteN":
            piece.nodeValue = "♘";
            break;
        case value = "blackP":
            piece.nodeValue = "♟";
            break;

        case value = "blackK":
            piece.nodeValue = "♚";
            break;

        case value = "blackQ":
            piece.nodeValue = "♛";
            break;

        case value = "blackR":
            piece.nodeValue = "♜";
            break;

        case value = "blackB":
            piece.nodeValue = "♝";
            break;

        case value = "blackN":
            piece.nodeValue = "♞";
            break;

        default:
            piece.nodeValue = "";
    }
    btn.appendChild(piece);
}

// Onclick function of buttons:
const onClick = (btn, coord) => {
    btn.addEventListener('click', () => {
        console.log('clicked on ' + coord);

        // Changes value of cells after click:
        btn.setAttribute('value', "selected");
        console.log(btn.getAttribute("value"));
    })
}