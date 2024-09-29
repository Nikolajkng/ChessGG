
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
    let canCapture = "";
    if (playerTurn === "White") {
        canCapture = targetBtn.getAttribute("value").includes("black")
    } else {
        canCapture = targetBtn.getAttribute("value").includes("white")
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
    } else if (canCapture && !(emptyCell) && (verticalMove === 1 && horizontalMove === 1)) {

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