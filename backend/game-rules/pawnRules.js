module.exports = {
    pawnRules
}

/*
    if (playerTurn === "White") {
        canCapture = targetBtn.getAttribute("value").includes("black") && !backwardsMoveWhite
    } else {
        canCapture = targetBtn.getAttribute("value").includes("white") && !backwardsMoveBlack
    }
*/

function pawnRules(x, y, tX, tY, chessBoard, turn, sValue, tValue) {

    // Shared rules
    let straightMove = Math.abs(y - tY) === 0;
    let maxStep = ""

    // Initial position allow pawns to move 2 steps
    if (x == 7 || x == 2) {
        maxStep = Math.abs(x - tX) <= 2;
    } else {
        // Exit of intial restricts move to 1 step
        maxStep = Math.abs(x - tX) === 1;
    }


    if (turn === "White") {
        // Specific rules for white
        let whiteFreePath = chessBoard[x - 1][y] === "none" || chessBoard[x - 2][y] === "none";
        let whiteGoBackwards = tX > x;
        return (whiteFreePath && straightMove && maxStep && !whiteGoBackwards)
    } else if (turn === "Black") {
        // Specific rules for black
        let blackFreePath = chessBoard[x + 1][parseInt(y)] === "none" || chessBoard[x + 2][y] === "none";
        let blackGoBackwards = tX < x;
        return (blackFreePath && straightMove && maxStep && !blackGoBackwards);
    }
}