module.exports = {
    pawnRules
}

function pawnRules(x, y, tX, tY, chessBoard) {
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


    //////////////////////////////////////////////////////////// WHITE PAWN LOGIC //////////////////////////////////////////////////////////// 
    if (playerTurn === "White") {


        //////////////////////////////////////////////////////////// BLACK PAWN LOGIC //////////////////////////////////////////////////////////// 
    } else if (playerTurn === "Black") {
        
        
    }
}