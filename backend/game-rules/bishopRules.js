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
    const anti_diagonalMove = x+y === tX+tY
    const whitePieces = tValue.includes("white");
    const blackPieces = tValue.includes("black");
    const freePath = checkBishopPath(dirVectorBR, dirVectorTL, dirVectorBL, dirVectorTR, x, y, tX, tY, chessBoard);


    if (turn === "White") {
        // Specific rules for white
        const satisfyAllRulesWhite = (diagonalMove || anti_diagonalMove) && freePath && !whitePieces
        if (satisfyAllRulesWhite) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return satisfyAllRulesWhite
        }

    } else if (turn === "Black") {
        // Specific rules for black
        const satisfyAllRulesBlack = (diagonalMove || anti_diagonalMove) && freePath && !blackPieces
        if (satisfyAllRulesBlack) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return satisfyAllRulesBlack
        }

    }
}


function checkBishopPath(dirVectorBR, dirVectorTL, dirVectorBL, dirVectorTR, X, Y, TX, TY, chessBoard) {

    // Comments from Niko:
    /* 
    1) The algorithm for traversal in "regular" diagonal direction (TopLeft -> BotRight) is to match the pattern of numerical diff between 'x' and 'y'.
    2) The algorith for traversal in "anti-diagonal" direction (BotLeft <- TopRight) is recursive, since pattern is not the same as the "regular diagonal"!
    2.1) Bonus: Just found out the pattern here is based on sum between x and y...
    */
    const XYDiff = Math.abs(X - Y);

    // Diagonal traversal in 2D array algorithm:
    let pathResult = [];
    if (dirVectorBR) {
        console.log("moving towards BOT-RIGHT")
        for (let n = X + 1; n < TX; n++) {
            for (let m = Y + 1; m < TY; m++) {
                if (m - n === XYDiff) {
                    pathResult.push(chessBoard[n][m]);
                    console.log(m + ", " + n)
                }
            }
        }
    } else if (dirVectorTL) {
        console.log("Moving towards TOP-LEFT")
        const xyDiff = Math.abs(X - Y);
        for (let n = X - 1; n > TX; n--) {
            for (let m = Y - 1; m > TY; m--) {
                if (n - m === xyDiff) {
                    // Create list of all values in bishop path
                    pathResult.push(chessBoard[n][m]);
                    console.log(m + ", " + n)
                }
            }
        }
    } else if (dirVectorTR) {
        console.log("moving towards TOP-RIGHT")
        while (chessBoard[X][Y] !== chessBoard[TX][TY]) {
            X--; // Move one row up
            Y++; // Move one col right
            pathResult.push(chessBoard[X][Y]);
            console.log(X + "," + Y);
        }
        pathResult.pop(pathResult.length - 1)
    } else if (dirVectorBL) {
        console.log("moving towards BOT-LEFT")
        while (chessBoard[X][Y] !== chessBoard[TX][TY]) {
            X++; // Move one row down
            Y--; // Move one col left
            pathResult.push(chessBoard[X][Y]);
            console.log(X + "," + Y);
        }
        // Removes target piece-value, only want in-between for path
        pathResult.pop(pathResult.length - 1)
    }

    // Check for "none" in the bishops free path array
    console.log(pathResult);
    const predicate = (v) => v === "none"
    return pathResult.every(predicate);

};




module.exports = {
    bishopRules
}