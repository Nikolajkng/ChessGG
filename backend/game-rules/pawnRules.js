module.exports = {
    pawnRules
}

/*
    if (playerTurn === "White") {
        canCapture = targetBtn.getAttribute("value").includes("black") && !backwardsMoveWhite
    } else {
        canCapture = targetBtn.getAttribute("value").includes("white") && !backwardsMoveBlack
    }
*/

function pawnRules(x, y, tX, tY, chessBoard, turn, sValue, tValue) {

    // Shared rules
    let straightMove = Math.abs(y - tY) === 0;
    let maxStep = ""
    let firstMove = false;

    // Initial position allow pawns to move 2 steps
    if (x == 7 || x == 2) {
        maxStep = Math.abs(x - tX) <= 2;
        firstMove = true;
    } else {
        // Exit of intial restricts move to 1 step
        maxStep = Math.abs(x - tX) === 1;
    }


    if (turn === "White") {
        // Specific rules for white
        let whiteFreePath = ""
        if (firstMove) {
            whiteFreePath = chessBoard[x - 1][y] && chessBoard[x - 2][y] === "none";
            firstMove = false;
        } else {
            chessBoard[x - 1][y] === "none"
        }

        let whiteGoBackwards = tX > x;
        let satisfyAllRulesWhite = (whiteFreePath && straightMove && maxStep && !whiteGoBackwards);

        if (satisfyAllRulesWhite) {
            swapValueArray(chessBoard, x, y, tX, tY)
        }

        return satisfyAllRulesWhite;
    } else if (turn === "Black") {
        // Specific rules for black
        if (firstMove) {
            blackFreePath = chessBoard[x + 1][y] && chessBoard[x + 2][y] === "none";
            firstMove = false;
        } else {
            chessBoard[x - 1][y] === "none"
        }
        let blackGoBackwards = tX < x;
        let satisfyAllRulesBlack = (blackFreePath && straightMove && maxStep && !blackGoBackwards);
        if (satisfyAllRulesBlack) {
            swapValueArray(chessBoard, x, y, tX, tY)
        }

        return satisfyAllRulesBlack;
    }
}

function swapValueArray(chessBoard, x, y, tX, tY) {
    const temp = chessBoard[x-1][y-1];
    chessBoard[x-1][y-1] = chessBoard[tY-1][tX-1]
    chessBoard[tX-1][tY-1] = temp;

    // Check array
    printBoard(chessBoard)
};

function printBoard(chessBoard){
    console.log("\n")
    console.log("---------------------------------------------------------------------")
    chessBoard.forEach(row => {
        console.log(row.join(" | "))
    });
    console.log("---------------------------------------------------------------------")
    console.log("\n")
};