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
    let firstMove = false;

    // Initial position allow pawns to move 2 steps
    if (x === 6 || x === 1) {
        maxStep = Math.abs(x - tX) <= 2;
        firstMove = true;
    } else {
        // Exit of intial restricts move to 1 step
        maxStep = Math.abs(x - tX) == 1;
    }


    if (turn === "White") {
        // Specific rules for white
        let whiteFreePath = ""
        if (firstMove) {
            whiteFreePath = chessBoard[x - 1][y] && chessBoard[x - 2][y] === "none";
            console.log("Inside freepath")
            console.log(whiteFreePath)
            console.log(x +","+ y)
            firstMove = false;
        } else {
            chessBoard[x - 1][y] === "none"
        }

        let whiteGoBackwards = tX > x;
        let satisfyAllRulesWhite = (whiteFreePath && straightMove && maxStep && !whiteGoBackwards);
        if (satisfyAllRulesWhite) {
            swapValueArray(chessBoard, x, y, tX, tY)
        }

        return satisfyAllRulesWhite;
    } else if (turn === "Black") {
        // Specific rules for black
        if (firstMove) {
            blackFreePath = chessBoard[x + 1][y] && chessBoard[x + 2][y] === "none";
            firstMove = false;
        } else {
            chessBoard[x + 1][y] === "none"
        }
        let blackGoBackwards = tX < x;
        let satisfyAllRulesBlack = (blackFreePath && straightMove && maxStep && !blackGoBackwards);
        if (satisfyAllRulesBlack) {
            swapValueArray(chessBoard, x, y, tX, tY)
        }

        return satisfyAllRulesBlack;
    }
}

function swapValueArray(chessBoard, X, Y, TX , TY) {
    const temp = chessBoard[X][Y];
    chessBoard[X][Y] = chessBoard[TX][TY]
    chessBoard[TX][TY] = temp;

    // Check array
    printBoard(chessBoard)
};


// This function is generated by CHATGPT (AI)
function printBoard(chessBoard) {
    console.log("\n")
    console.log("---------------------------------------------------------------------")
    
    // Determine the max length of any element in the board
    const lengthOfAllItems = chessBoard.flat().map(item => item.length);
    const maxLength = Math.max(...lengthOfAllItems);
    
    // Helper function to pad each element to the max length
    function padItem(item) {
        return item.padEnd(maxLength, ' '); // Pad with spaces to the right
    }
    
    chessBoard.forEach(row => {
        // Use padded items for consistent spacing
        const paddedRow = row.map(padItem);
        console.log(paddedRow.join(" | "));
    });

    console.log("---------------------------------------------------------------------")
    console.log("\n")
};
