const {
    checkBishopPath
} = require("./bishopRules");
const {
    checkRookPath
} = require("./rookRules");

function queenRules(x, y, tX, tY, chessBoard, turn, sValue, tValue, moveType) {
    const {
        swapValueArray,
        swapValueCapture
    } = require("./legalMove")

    // Movement rules for Queen:
    const targetIsWhitePieces = tValue.includes("white");
    const targetIsBlackPieces = tValue.includes("black");
    const straight = Math.abs(x - tX) === 0 || Math.abs(y - tY) === 0;
    const diagonal = Math.abs(x - y) === Math.abs(tX - tY) || (x+y) === (tX + tY);


    // If straight -> use rook path algo, else use bishop (not straight = diagonal)
    const freePath = straight ? checkRookPath(x, y, tX, tY, chessBoard) : checkBishopPath(x, y, tX, tY, chessBoard)

    // Capture logic:
    if (moveType === "capture") {
        if (turn === "White") {
            if (targetIsBlackPieces && !targetIsWhitePieces && freePath && (diagonal || straight)) {
                swapValueCapture(chessBoard, x, y, tX, tY);
                return true;
            }
        } else if (turn === "Black") {
            if (!targetIsBlackPieces && targetIsWhitePieces && freePath && (diagonal || straight)) {
                swapValueCapture(chessBoard, x, y, tX, tY);
                return true;
            }
        }
    // Movement for bishops independent of player turn:
    } else if (moveType === "move") {
        const satisfyAllRules = (diagonal || straight) && freePath
        if (satisfyAllRules) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return true;
        }
    }

}

module.exports = {
    queenRules
}