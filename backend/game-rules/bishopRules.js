module.exports = {
    bishopRules
}

const boardSize = 8;

function bishopRules(x, y, tX, tY, chessBoard, turn, sValue, tValue) {

    // Shared rules
    let diagonalMove = Math.abs(x - tX) === Math.abs(y - tY)
    let freePath = checkBishopPath(x, y, tX, tY, chessBoard);


    if (turn === "White") {
        // Specific rules for white

        return diagonalMove && freePath
    } else if (turn === "Black") {
        // Specific rules for black


        return diagonalMove && freePath
    }
}


function checkBishopPath(x, y, tX, tY, chessBoard) {
    let valueArr = [];
    
    // Traversal from Top-Left towards Bottom-Right
    const xyDiff = Math.abs(x-y);
    for (let n = x; n < boardSize; n++) {
        for (let m = y; m < tY; m++) {
            if (m-n === xyDiff) {
                // Create list of all values in bishop path
                valueArr.push(chessBoard[n][m]);
            }
        }
    }
    // Print for Analyse content
    console.log(valueArr);

    // Check the list for "none" = free path
    const predicate = (v) => v === "none"
    return valueArr.every(predicate);
};