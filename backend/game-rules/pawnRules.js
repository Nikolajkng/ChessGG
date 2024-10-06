function pawnRules(x, y, tX, tY, chessBoard, turn, sValue, tValue) {
    const {
        swapValueArray
    } = require("./ruleChecker")


    // Shared rules
    let straightMove = Math.abs(y - tY) === 0;
    let maxStep = ""
    let firstMove = false;

    // Initial position allow pawns to move 2 steps
    if (x === 6 || x === 1) {
        maxStep = Math.abs(x - tX) <= 2;
        firstMove = true;
    } else {
        // Exit of intial restricts move to 1 step
        maxStep = Math.abs(x - tX) == 1;
    }


    if (turn === "White") {
        // Specific rules for white
        let whiteFreePath = ""
        if (firstMove) {
            whiteFreePath = chessBoard[x - 1][y] && chessBoard[x - 2][y] === "none";
            firstMove = false;
        } else {
            whiteFreePath = chessBoard[x - 1][y] === "none"
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
            blackFreePath = chessBoard[x + 1][y] === "none"
        }
        let blackGoBackwards = tX < x;
        let satisfyAllRulesBlack = (blackFreePath && straightMove && maxStep && !blackGoBackwards);
        if (satisfyAllRulesBlack) {
            swapValueArray(chessBoard, x, y, tX, tY)
        }
        return satisfyAllRulesBlack;
    }
}
module.exports = {
    pawnRules
}