const highlightPiece = (btn) => {
    btn.classList.add('highlight');
}

const removePieceTrail = (btn) => {
    while (btn.firstChild) {
        btn.removeChild(btn.firstChild);
    }
}

const removeHighlight = () => {
    if (selectedBtn != null) {
        selectedBtn.classList.remove('highlight');
        selectedBtn.setAttribute('selected', 'no');
        canSelect = true;
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
    highlightPlayerMenu();


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
            highlightPiece(btn);
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
            highlightPiece(btn);
            //btn.classList.add('highlight');
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