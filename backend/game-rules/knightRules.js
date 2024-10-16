function knightRules(x, y, tX, tY, chessBoard, turn, sValue, tValue, moveType) {
    const {
        swapValueArray,
        swapValueCapture
    } = require("./legalMove")

    // Knight movement rules
    const targetIsWhitePieces = tValue.includes("white");
    const targetIsBlackPieces = tValue.includes("black");
    const movePatternUp = tX === x - 2 && (tY === y + 1 || tY === y - 1)
    const movePatternDown = tX === x + 2 && (tY === y + 1 || tY === y - 1)
    const movePatternRight = tY === y + 2 && (tX === x + 1 || tX === x - 1)
    const movePatternLeft = tY === y - 2 && (tX === x + 1 || tX === x - 1)

    // Capture logic:
    if (moveType === "capture") {
        if (turn === "White") {
            if (targetIsBlackPieces && !targetIsWhitePieces && (movePatternUp || movePatternDown || movePatternRight || movePatternLeft)) {
                swapValueCapture(chessBoard, x, y, tX, tY);
                return true;
            }
        } else if (turn === "Black") {
            if (!targetIsBlackPieces && targetIsWhitePieces && (movePatternUp || movePatternDown || movePatternRight || movePatternLeft)) {
                swapValueCapture(chessBoard, x, y, tX, tY);
                return true;
            }
        }

    } else if (moveType === "move") {
        // Knight move is independent of player color
        const satisfyAllRules = (movePatternUp || movePatternDown || movePatternRight || movePatternLeft);
        if (satisfyAllRules) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return true;
        }
    }
}

module.exports = {
    knightRules
}