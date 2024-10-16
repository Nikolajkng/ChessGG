function kingRules(x, y, tX, tY, chessBoard, turn, sValue, tValue, moveType) {
    const {
        swapValueArray,
        swapValueCapture
    } = require("./legalMove")

    // King movement Rules
    const targetIsWhitePieces = tValue.includes("white");
    const targetIsBlackPieces = tValue.includes("black");
    const maxStepsCross =
        Math.abs(tX - x) === 1 && Math.abs(tY - y) === 0 ||
        Math.abs(tY - y) === 1 && Math.abs(tX - x) === 0

    const maxStepsDiagonal =
        Math.abs(x - y) === Math.abs(tX - tY) &&
        ((tX === x - 1 && tY === y - 1) || (tX === x + 1 && tY === y + 1))

    const maxStepsAntiDiagonal =
        Math.abs(x + y) === Math.abs(tX + tY) &&
        ((tX === x + 1 && tY === y - 1) || (tX === x - 1 && tY === y + 1))


    // Capture logic:
    if (moveType === "capture") {
        if (turn === "White") {
            if (targetIsBlackPieces && !targetIsWhitePieces && (maxStepsCross || maxStepsAntiDiagonal || maxStepsDiagonal)) {
                swapValueCapture(chessBoard, x, y, tX, tY);
                return true;
            }
        } else if (turn === "Black") {
            if (!targetIsBlackPieces && targetIsWhitePieces && (maxStepsCross || maxStepsAntiDiagonal || maxStepsDiagonal)) {
                swapValueCapture(chessBoard, x, y, tX, tY);
                return true;
            }
        }
        // Movement for bishops independent of player turn:
    } else if (moveType === "move") {
        const satisfyAllRules = (maxStepsCross || maxStepsAntiDiagonal || maxStepsDiagonal)
        if (satisfyAllRules) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return satisfyAllRules
        }
    }
}


module.exports = {
    kingRules
}