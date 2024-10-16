function bishopRules(x, y, tX, tY, chessBoard, turn, sValue, tValue, moveType) {
    const {
        swapValueArray,
        swapValueCapture
    } = require("./legalMove")


    // Bishop movement rules:
    const targetIsWhitePieces = tValue.includes("white");
    const targetIsBlackPieces = tValue.includes("black");
    const diagonalMove = Math.abs(x - y) === Math.abs(tX - tY);
    const anti_diagonalMove = x + y === tX + tY
    const freePath = checkBishopPath(x, y, tX, tY, chessBoard);


    // Capture logic:
    if (moveType === "capture") {
        if (turn === "White") {
            if (targetIsBlackPieces && !targetIsWhitePieces) {
                swapValueCapture(chessBoard, x, y, tX, tY);
                return true;
            }
        } else if (turn === "Black") {
            if (!targetIsBlackPieces && targetIsWhitePieces) {
                swapValueCapture(chessBoard, x, y, tX, tY);
                return true;
            }
        }
    // Movement for bishops independent of player turn:
    } else if (moveType === "move") {
        const satisfyAllRules = (diagonalMove || anti_diagonalMove) && freePath
        if (satisfyAllRules) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return satisfyAllRules
        }
    }
}



function checkBishopPath(X, Y, TX, TY, chessBoard) {
    console.log("Bishop path")

    // Subtract startpos with endpos to get vector: (x0,y0) - (x1-y1) = <a,b>
    let a = X - TX;
    let b = Y - TY;

    // Vector to indicate direction (Bottom-right, TL = Top-left, BL = Bottom-left, TR = Top-right)
    // Remember, not cartesian coordinate system, dont get confused on corner directions!
    const dirVectorTR = a > 0 && b < 0
    const dirVectorBL = a < 0 && b > 0
    const dirVectorBR = a < 0 && b < 0
    const dirVectorTL = a > 0 && b > 0

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
    bishopRules,
    checkBishopPath
}