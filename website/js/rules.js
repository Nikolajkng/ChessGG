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

const capturePiece = () => {

}

const pawnRules = (mySelectBtn, targetBtn) => {

    // Rules:
    const blockedPath = false;
    const emptyCell = targetBtn.getAttribute("value") === "none"
    let capturePiece = "";
    if (playerTurn === "White") {
        capturePiece = targetBtn.getAttribute("value").includes("black")
    } else {
        capturePiece = targetBtn.getAttribute("value").includes("white")
    }

    // Relative Positions and info:
    const selectValue = mySelectBtn.getAttribute("value");
    const targetValue = targetBtn.getAttribute("value");
    const x = parseInt(mySelectBtn.getAttribute("x"));
    const y = parseInt(mySelectBtn.getAttribute("y"));
    const tX = parseInt(targetBtn.getAttribute("x"));
    const tY = parseInt(targetBtn.getAttribute("y"));

    
    // Check Rules:
    if (blockedPath) {
        // If the selected piece-path to target cell is blocked by any pieces: 
        return false;
    } else if (emptyCell) {
        // If the target cell is an empty cell with no pieces (They have to be opposite apparantly):
        const diff = Math.abs(x - tX);

        for(let start = 1; start <= boardSize; start++){
            // Initially pawns in startposition can move 2 cells
            if(x == 7 || x == 2){
                return (diff >= 0 && diff <= 2) 
            } else {
            // After exiting startposition, pawns can only move by 1 cell
                return (diff === 1)
            }
        }

    } else if (capturePiece) {
        // If the target cell has an enemy piece:
        targetValue.

        console.log("COLLIDED WITH ENEMY PIECE");

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