// Local variables:
let cellSize = 100;

// Change value of cells:
const changeValue = (btn, value) => {
    btn.setAttribute("id", value)
}

// Set value of cells:
const setStartValues = (btn, x, y) => {
    // Pawns
    if (x == 2) {
        btn.setAttribute("value", "whitepawns");
    } else if (x == 7) {
        btn.setAttribute("value", "blackpawns");
    }
    // Rooks
    else if ((x == 8 && y == 1) || (x == 8 && y == 8)) {
        btn.setAttribute("value", "whiterooks");
    } else if ((x == 1 && y == 1) || (x == 1 && y == 8)) {
        btn.setAttribute("value", "blackrooks");
    }
    // Knight
    else if ((x == 8 && y == 2) || (x == 8 && y == 7)) {
        btn.setAttribute("value", "whiteknight");
    } else if ((x == 1 && y == 2) || (x == 1 && y == 7)) {
        btn.setAttribute("value", "blackknight");
    }
    // Bishop
    else if ((x == 8 && y == 3) || (x == 8 && y == 6)) {
        btn.setAttribute("value", "whitebishop");
    } else if ((x == 1 && y == 3) || (x == 1 && y == 6)) {
        btn.setAttribute("value", "blackbishop");
    }
    // Queen
    else if ((x == 8 && y == 4)) {
        btn.setAttribute("value", "whitequeen");
    } else if ((x == 1 && y == 4)) {
        btn.setAttribute("value", "blackqueen");
    }
    // King
    else if ((x == 8 && y == 5)) {
        btn.setAttribute("value", "whiteking");
    } else if ((x == 1 && y == 5)) {
        btn.setAttribute("value", "whiteking");
    }
    // Error handling to console
    else {
        btn.setAttribute("value", "none")
    }

    console.log("Piece ("+x+","+y+"): "+btn.getAttribute("value"));
}


// Onclick function of buttons:
const onClick = (newButton, coord) => {
    newButton.addEventListener('click', () => {
        console.log('clicked on ' + coord);

        // Changes value of cells after click:
        changeValue(newButton, "-1");
        console.log(newButton.getAttribute("value"))
    })
}

// Style of buttons:
const styleCells = (newButton, newText) => {
    newButton.appendChild(newText);
    newButton.style.width = cellSize + "px";
    newButton.style.height = cellSize + "px";
    newButton.style.padding = 0 + "px";
    newButton.style.margin = 0 + "px";
}