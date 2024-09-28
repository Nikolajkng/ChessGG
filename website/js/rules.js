const legalMove = (selectedBtn, targetBtn) => {

    if (selectedBtn != null) {

        const targetValue = targetBtn.getAttribute("value");
        const selectValue = selectedBtn.getAttribute("value");
        console.log("checking legal move for: " + selectValue);
        console.log("target move is: " + targetValue)

        if (selectValue.includes("P")) {
            return pawnRules(selectedBtn, targetBtn);
        } else if (selectValue.includes("N")) {
            return knightRules(selectedBtn, targetBtn);
        } else if (selectValue.includes("B")) {
            return bishopRules(selectedBtn, targetBtn);
        } else if (selectValue.includes("R")) {
            return rookRules(selectedBtn, targetBtn);
        } else if (selectValue.includes("K")) {
            return kingRules(selectedBtn, targetBtn);
        } else if (selectValue.includes("Q")) {
            return queenRules(selectedBtn, targetBtn);
        }

        return false;
    } else {
        // TO DO: add chess illegal move sound
        console.error("Error: Selectedbtn === null -> Cause: (1): not your turn, (2): not your pieces");
    }
}


const pawnRules = (mySelectBtn, targetBtn) => {

    // Relative Positions and info:
    const selectValue = mySelectBtn.getAttribute("value");
    const targetValue = targetBtn.getAttribute("value");
    const x = parseInt(mySelectBtn.getAttribute("x"));
    const y = parseInt(mySelectBtn.getAttribute("y"));
    const tX = parseInt(targetBtn.getAttribute("x"));
    const tY = parseInt(targetBtn.getAttribute("y"));

    // Rules:
    const blockedPath = false;
    const emptyCell = targetBtn.getAttribute("value") === "none"
    const verticalMove = Math.abs(tX-x);
    const horizontalMove = Math.abs(tY-y);
    const straightLine = horizontalMove === 0;
    let capturePiece = "";
    if (playerTurn === "White") {
        capturePiece = targetBtn.getAttribute("value").includes("black")
    } else {
        capturePiece = targetBtn.getAttribute("value").includes("white")
    }

    // Check Rules:
    if (blockedPath) {
        return false;
    } else if (emptyCell) {
        for (let start = 1; start <= boardSize; start++) {
            // Initially pawns in startposition can move 2 cells
            if ((x == 7 || x == 2)) {
                return (verticalMove >= 0 && verticalMove <= 2) && straightLine;
            } else {
                // After exiting startposition, pawns can only move by 1 cell
                return (verticalMove === 1 && horizontalMove === 0);
            }
        }
    } else if (capturePiece && !(emptyCell) && (verticalMove === 1 && horizontalMove === 1)) {

        // Clear selected piece from board
        removePieceTrail(selectedBtn);

        // Remove attacked piece:
        removePieceTrail(targetBtn);

        // Place selected piece on target: 
        placeNewPiece(targetBtn);

        // Update the values on pieces by swapping:
        swapPieceValue(selectedBtn, targetBtn);

        // Clears selection highlight:
        removeHighlight();

        // Move is finished:
        clickCount++;

    } else {
        // Error handling:
        console.error("Error in pawnRules");
    };
}


// TO DO: 
const knightRules = (mySelectBtn, targetBtn) => {
    return true;
}
const bishopRules = (mySelectBtn, targetBtn) => {
    return true;
}
const rookRules = (mySelectBtn, targetBtn) => {
    return true;
}
const kingRules = (mySelectBtn, targetBtn) => {
    return true;
}
const queenRules = (mySelectBtn, targetBtn) => {
    return true;
}