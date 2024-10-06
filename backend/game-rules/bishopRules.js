const boardSize = 8;

function bishopRules(x, y, tX, tY, chessBoard, turn, sValue, tValue) {
    const {
        swapValueArray
    } = require("./ruleChecker")

    // Subtract startpos with endpos to get vector --> signs of vector gives direction  (x0,y0)-(x1-y1) = <a,b>
    // Notes: BR = Bottom-right, TL = Top-left, BL = Bottom-left, TR = Top-right        (remember, not cartesian coordinate system!)
    let a = x - tX;
    let b = y - tY;
    const dirVectorTR = a > 0 && b < 0
    const dirVectorBL = a < 0 && b > 0
    const dirVectorBR = a < 0 && b < 0
    const dirVectorTL = a > 0 && b > 0
    const diagonalMove = Math.abs(x - y) === Math.abs(tX - tY);
    const freePath = checkBishopPath(dirVectorBR, dirVectorTL, dirVectorBL, dirVectorTR, x, y, tX, tY, chessBoard);


    if (turn === "White") {
        // Specific rules for white
        const satisfyAllRulesWhite = diagonalMove && freePath
        if (satisfyAllRulesWhite) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return satisfyAllRulesWhite
        }

    } else if (turn === "Black") {
        // Specific rules for black
        const satisfyAllRulesBlack = diagonalMove && freePath
        if (satisfyAllRulesBlack) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return satisfyAllRulesBlack
        }

    }
}


function checkBishopPath(dirVectorBR, dirVectorTL, dirVectorBL, dirVectorTR, X, Y, TX, TY, chessBoard) {

    // Diagonal traversal in 2D array algorithm:
    const XYDiff = Math.abs(X - Y);
    let valueArr = [];
    if (dirVectorBR) {
        console.log("moving towards BOT-RIGHT")
        for (let n = X + 1; n < boardSize; n++) {
            for (let m = Y + 1; m < TY; m++) {
                if (m - n === XYDiff) {
                    // Create list of all values in bishop path
                    valueArr.push(chessBoard[n][m]);
                    console.log(m + ", " + n)
                }
            }
        }

    } else if (dirVectorBL) {
        console.log("moving towards BOT-LEFT")

    } else if (dirVectorTR) {
        console.log("moving towards TOP-RIGHT")

    } else if (dirVectorTL) {
        console.log("Moving towards TOP-LEFT")

    }

    // Check for "none" in the bishops free path
    console.log(valueArr);
    const predicate = (v) => v === "none"
    return valueArr.every(predicate);

};




module.exports = {
    bishopRules
}