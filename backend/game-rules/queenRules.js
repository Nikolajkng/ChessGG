const {
    checkBishopPath
} = require("./bishopRules");
const {
    checkRookPath
} = require("./rookRules");

function queenRules(x, y, tX, tY, chessBoard, turn, sValue, tValue) {
    const {
        swapValueArray
    } = require("./ruleChecker")

    // Movement rules for Queen:
    const whitePieces = tValue.includes("white");
    const blackPieces = tValue.includes("black");
    const straight = Math.abs(x - tX) === 0 || Math.abs(y - tY) === 0;
    const diagonal = Math.abs(x - y) === Math.abs(tX - tY);


    // If straight -> use rook path algo, else use bishop (not straight = diagonal)
    const freePathQueen = straight ? checkRookPath(x, y, tX, tY, chessBoard) : checkBishopPath(x, y, tX, tY, chessBoard)

    // Check if rook rules are satisfied
    if (turn === "White") {
        // Specific rules for white
        const satisfyAllRulesWhite = !whitePieces && (straight || diagonal) && freePathQueen
        if (satisfyAllRulesWhite) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return satisfyAllRulesWhite
        }
    } else if (turn === "Black") {
        // Specific rules for black
        const satisfyAllRulesBlack = !blackPieces && (straight || diagonal) && freePathQueen
        if (satisfyAllRulesBlack) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return satisfyAllRulesBlack
        }

    }

}

module.exports = {
    queenRules
}