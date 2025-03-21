function pawnRules(x, y, tX, tY, chessBoard, turn, sValue, tValue, moveType) {
    const {
        swapValueArray,
        swapValueCapture
    } = require("./legalMove")


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
        let whiteGoBackwards = tX > x;

        // First move allows pawn to take 2 steps
        if (firstMove) {
            whiteFreePath = chessBoard[x - 1][y] && chessBoard[x - 2][y] === "none";
            firstMove = false;
        } else {
            whiteFreePath = chessBoard[x - 1][y] === "none"
        }

        // Logic for capture:
        if (moveType === "capture") {
            let capturePatternWhite = Math.abs(x - tX) === 1 && Math.abs(y - tY) === 1;
            let satisfyCaptureRulesWhite = (capturePatternWhite && tValue.includes("black"));
            if (satisfyCaptureRulesWhite) {
                swapValueCapture(chessBoard, x, y, tX, tY)
                return true;
            }
            return satisfyCaptureRulesWhite
            // Logic for move:
        } else if (moveType === "move") {

            let satisfyAllRulesWhite = (whiteFreePath && straightMove && maxStep && !whiteGoBackwards);
            if (satisfyAllRulesWhite) {
                swapValueArray(chessBoard, x, y, tX, tY)
                return true;
            }
        }

    } else if (turn === "Black") {
        // Specific rules for black
        let blackFreePath = ""
        let blackGoBackwards = tX < x;

        // First move allows pawn to take 2 steps
        if (firstMove) {
            blackFreePath = chessBoard[x + 1][y] && chessBoard[x + 2][y] === "none";
            firstMove = false;
        } else {
            blackFreePath = chessBoard[x + 1][y] === "none"
        }

        // Logic for capture:
        if (moveType === "capture") {
            let capturePatternBlack = Math.abs(x - tX) === 1 && Math.abs(y - tY) === 1;
            let satisfyCaptureRulesBlack = (capturePatternBlack && tValue.includes("white"));
            if (satisfyCaptureRulesBlack) {
                swapValueCapture(chessBoard, x, y, tX, tY)
                return true;
            }
            // Logic for move:
        } else if (moveType === "move") {
            let satisfyAllRulesBlack = (blackFreePath && straightMove && maxStep && !blackGoBackwards);
            if (satisfyAllRulesBlack) {
                swapValueArray(chessBoard, x, y, tX, tY)
                return true;
            }
        }
    }
}
module.exports = {
    pawnRules
}