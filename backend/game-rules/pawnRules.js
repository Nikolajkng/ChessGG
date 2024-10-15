function pawnRules(x, y, tX, tY, chessBoard, turn, sValue, tValue, moveType) {
    const {
        swapValueArray,
        swapValueCapture
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
            }
            return satisfyCaptureRulesWhite
            // Logic for move:
        } else if (moveType === "move") {

            let satisfyAllRulesWhite = (whiteFreePath && straightMove && maxStep && !whiteGoBackwards);
            if (satisfyAllRulesWhite) {
                swapValueArray(chessBoard, x, y, tX, tY)
            }
            return satisfyAllRulesWhite;
        }



    } else if (turn === "Black") {
        console.log("hej 1")
        // Specific rules for black
        let blackFreePath = ""
        let blackGoBackwards = tX < x;

        // First move allows pawn to take 2 steps
        if (firstMove) {
            blackFreePath = chessBoard[x + 1][y] && chessBoard[x + 2][y] === "none";
            firstMove = false;
            console.log("hej 2")

        } else {
            blackFreePath = chessBoard[x + 1][y] === "none"
            console.log("hej 3")

        }

        // Logic for capture:
        if (moveType === "capture") {
            console.log("hej 4")

            let capturePatternBlack = Math.abs(x - tX) === 1 && Math.abs(y - tY) === 1;
            let satisfyCaptureRulesBlack = (capturePatternBlack && tValue.includes("white"));
            if (satisfyCaptureRulesBlack) {
                swapValueCapture(chessBoard, x, y, tX, tY)
            }
            // Logic for move:
        } else if (moveType === "move") {
            console.log("hej 5")

            let satisfyAllRulesBlack = (blackFreePath && straightMove && maxStep && !blackGoBackwards);
            console.log(satisfyAllRulesBlack)
            if (satisfyAllRulesBlack) {
                swapValueArray(chessBoard, x, y, tX, tY)
            }
            return satisfyAllRulesBlack;
        }
    }
}
module.exports = {
    pawnRules
}