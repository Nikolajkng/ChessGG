module.exports = {
    pawnRules
}

function pawnRules(x, y, tX, tY, chessBoard, turn, sValue, tValue) {
    /* OLD 
    // Movement rules:
    const blockedPath = false;
    const emptyCell = targetBtn.getAttribute("value") === "none"
    const verticalMove = Math.abs(tX - x);
    const horizontalMove = Math.abs(tY - y);
    const straightLine = horizontalMove === 0;
    const backwardsMoveWhite = tX > x;
    const backwardsMoveBlack = tX < x;
    let canCapture = "";
    if (playerTurn === "White") {
        canCapture = targetBtn.getAttribute("value").includes("black") && !backwardsMoveWhite
    } else {
        canCapture = targetBtn.getAttribute("value").includes("white") && !backwardsMoveBlack
    }
*/
    let freePath = false; // Temp. value -> easier to debug as 'false'
    if (chessBoard[x - 1][y] === "none" || chessBoard[x - 2][y] === "none") {
        freePath = true;
    }

    //////////////////////////////////////////////////////////// WHITE PAWN LOGIC //////////////////////////////////////////////////////////// 
    if (turn === "White") {
        if (freePath) {
            return true;
        } else {
            console.log("path is blocked")
            return false;
        }


        //////////////////////////////////////////////////////////// BLACK PAWN LOGIC //////////////////////////////////////////////////////////// 
    } else if (turn === "Black") {
        return true;
    }
}