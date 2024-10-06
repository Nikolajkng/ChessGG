function kingRules(x, y, tX, tY, chessBoard, turn, sValue, tValue) {
    const {
        swapValueArray
    } = require("./ruleChecker")

    // King movement Rules
    const whitePieces = tValue.includes("white");
    const blackPieces = tValue.includes("black");
    const maxStepsCross =
        Math.abs(tX - x) === 1 && Math.abs(tY - y) === 0 ||
        Math.abs(tY - y) === 1 && Math.abs(tX - x) === 0

    const maxStepsDiagonal =
        Math.abs(x - y) === Math.abs(tX - tY) &&
        ((tX === x - 1 && tY === y - 1) || (tX === x + 1 && tY === y + 1))

    const maxStepsAntiDiagonal =
        Math.abs(x + y) === Math.abs(tX + tY) &&
        ((tX === x + 1 && tY === y - 1) || (tX === x - 1 && tY === y + 1))

        
    // Check if king rules are satisfied:
    if (turn === "White") {
        const satisfyAllRulesWhite = !whitePieces && (maxStepsCross || maxStepsDiagonal || maxStepsAntiDiagonal);
        if (satisfyAllRulesWhite) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return true;
        }
    } else if (turn === "Black") {
        const satisfyAllRulesBlack = !blackPieces && (maxStepsCross || maxStepsDiagonal || maxStepsAntiDiagonal);
        if (satisfyAllRulesBlack) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return true;
        }

    }


}


module.exports = {
    kingRules
}