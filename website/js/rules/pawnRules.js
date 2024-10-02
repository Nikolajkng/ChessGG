function pawnRules(mySelectBtn, targetBtn) {

    // Relative Positions and info:
    const x = parseInt(mySelectBtn.getAttribute("x"));
    const y = parseInt(mySelectBtn.getAttribute("y"));
    const tX = parseInt(targetBtn.getAttribute("x"));
    const tY = parseInt(targetBtn.getAttribute("y"));

    // Movement rules:
    const blockedPath = false;
    const emptyCell = targetBtn.getAttribute("value") === "none"
    const verticalMove = Math.abs(tX - x);
    const horizontalMove = Math.abs(tY - y);
    const straightLine = horizontalMove === 0;
    const backwardsMoveWhite = tX > x;
    const backwardsMoveBlack = tX < x;
    let canCapture = "";
    if (playerTurn === "White") {
        canCapture = targetBtn.getAttribute("value").includes("black") && !backwardsMoveWhite
    } else {
        canCapture = targetBtn.getAttribute("value").includes("white") && !backwardsMoveBlack
    }


    //////////////////////////////////////////////////////////// WHITE PAWN LOGIC //////////////////////////////////////////////////////////// 

    // Check Rules:
    if (playerTurn === "White") {
        // Prevents movement if pawns path are blocked by other pieces:
        if (blockedPath) {
            return false;
            // Ensures straight-only movement when moving to empty cells:
        } else if (emptyCell) {
            for (let start = 1; start <= boardSize; start++) {
                if ((x == 7 || x == 2)) {
                    return (verticalMove >= 0 && verticalMove <= 2) && straightLine && !backwardsMoveWhite; // Pawns at startposition can move 2
                } else {
                    return (verticalMove === 1 && horizontalMove === 0 && !backwardsMoveWhite); // Pawns exited startposition can move 1
                }
            }
            // Enable diagonal movement when attacking:
        } else if (canCapture && !(emptyCell) && (verticalMove === 1 && horizontalMove === 1)) {


            // Remove trail piece from old position:
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

        } 
        //////////////////////////////////////////////////////////// BLACK PAWN LOGIC //////////////////////////////////////////////////////////// 
    } else if (playerTurn === "Black") {
        // Prevents movement if pawns path are blocked by other pieces:
        if (blockedPath) {
            return false;
            // Ensures straight-only movement when moving to empty cells:
        } else if (emptyCell) {
            for (let start = 1; start <= boardSize; start++) {
                if ((x == 7 || x == 2)) {
                    return (verticalMove >= 0 && verticalMove <= 2) && straightLine && !backwardsMoveBlack; // Pawns at startposition can move 2
                } else {
                    return (verticalMove === 1 && horizontalMove === 0 && !backwardsMoveBlack); // Pawns exited startposition can move 1
                }
            }
            // Enable diagonal movement when attacking:
        } else if (canCapture && !(emptyCell) && (verticalMove === 1 && horizontalMove === 1)) {

            // Remove trail piece from old position:
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
        }

    }
}