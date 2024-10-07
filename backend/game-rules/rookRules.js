function rookRules(x, y, tX, tY, chessBoard, turn, sValue, tValue) {
    const {
        swapValueArray
    } = require("./ruleChecker")

    // Movement rules for Rook:
    const whitePieces = tValue.includes("white");
    const blackPieces = tValue.includes("black");
    const straightLines = Math.abs(x - tX) === 0 || Math.abs(y - tY) === 0;
    const freePathRook = checkRookPath(x, y, tX, tY, chessBoard);

    // Check if rook rules are satisfied
    if (turn === "White") {
        // Specific rules for white


        // Final check
        const satisfyAllRulesWhite = !whitePieces && straightLines && freePathRook
        if (satisfyAllRulesWhite) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return satisfyAllRulesWhite
        }
    } else if (turn === "Black") {
        // Specific rules for black


        // Final check
        const satisfyAllRulesBlack = !blackPieces && straightLines && freePathRook
        if (satisfyAllRulesBlack) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return satisfyAllRulesBlack
        }

    }

}

function checkRookPath(X, Y, TX, TY, chessBoard) {
    console.log("rook path")
    // Vectors to indicate direction:
    let a = TX - X;
    let b = TY - Y;
    const up = a < 0 && Math.abs(Y - TY) === 0
    const down = a > 0 && Math.abs(Y - TY) === 0
    const right = b > 0 && Math.abs(X - TX) === 0
    const left = b < 0 && Math.abs(X - TX) === 0
    let pathResult = [];

    // Algorithm: Check direction vector -> go in that direction and collect all values until target coord -> Check collection for free path
    if (up) {
        while (X !== TX) {
            pathResult.push(chessBoard[X][Y])
            X--;
        }
        pathResult.splice(pathResult[0], 1); // Remove itself from path
    } else if (down) {
        while (X !== TX) {
            pathResult.push(chessBoard[X][Y])
            X++;
        }
        pathResult.splice(pathResult[0], 1); // Remove itself from path
    } else if (right) {
        while (Y !== TY) {
            pathResult.push(chessBoard[X][Y])
            Y++;
        }
        pathResult.splice(pathResult[0], 1); // Remove itself from path
    } else if (left) {
        while (Y !== TY) {
            pathResult.push(chessBoard[X][Y])
            Y--;
        }
        pathResult.splice(pathResult[0], 1); // Remove itself from path
    }
    const predicate = (v) => v === 'none';
    console.log(pathResult)
    return pathResult.every(predicate);
}


module.exports = {
    rookRules,
    checkRookPath
}