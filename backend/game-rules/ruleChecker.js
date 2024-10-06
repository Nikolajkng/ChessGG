// Import the individual piece-rule functions:
const { bishopRules} = require('./bishopRules');
const { kingRules } = require('./kingRules');
const { knightRules } = require('./knightRules');
const { pawnRules } = require('./pawnRules');
const { queenRules } = require('./queenRules');
const { rookRules } = require('./rookRules');


// 8x8 data game board that contains each button object
let chessBoard = [
    ["blackR", "blackN", "blackB", "blackQ", "blackK", "blackB", "blackN", "blackR"],
    ["blackP", "blackP", "blackP", "blackP", "blackP", "blackP", "blackP", "blackP"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["none", "none", "none", "none", "none", "none", "none", "none"],
    ["whiteP", "whiteP", "whiteP", "whiteP", "whiteP", "whiteP", "whiteP", "whiteP"],
    ["whiteR", "whiteN", "whiteB", "whiteQ", "whiteK", "whiteB", "whiteN", "whiteR"]
];



// Checks for specific piece's legal move rules 
function legalMove(x, y, tX, tY, sValue, tValue, turn, moveType){
    //const targetValue = sBtn.getAttribute("value");
    const selectValue = sValue;
    console.log("\n")
    console.log("MoveType detected as : " + moveType)

    // Filter which piece has been selected -> applies correct rule for specific piece-type: 
    if (selectValue.includes("P")) {
        return pawnRules(x, y, tX, tY, chessBoard, turn, sValue, tValue);
        } else if (selectValue.includes("N")) {
            return knightRules(x, y, tX, tY, chessBoard, turn, sValue, tValue);
        } else if (selectValue.includes("B")) {
            return bishopRules(x, y, tX, tY, chessBoard, turn, sValue, tValue);
        } else if (selectValue.includes("R")) {
            return rookRules(x, y, tX, tY, chessBoard, turn, sValue, tValue);
        } else if (selectValue.includes("K")) {
            return kingRules(x, y, tX, tY, chessBoard, turn, sValue, tValue);
        } else if (selectValue.includes("Q")) {
            return queenRules(x, y, tX, tY, chessBoard, turn, sValue, tValue);
    } else {
        console.error("Error in rulechecker");
        return false;
    }
}

function resetGameArray(){
    console.log("Player disconnected: Resetting board array...")
    chessBoard = [
        ["blackR", "blackN", "blackB", "blackQ", "blackK", "blackB", "blackN", "blackR"],
        ["blackP", "blackP", "blackP", "blackP", "blackP", "blackP", "blackP", "blackP"],
        ["none", "none", "none", "none", "none", "none", "none", "none"],
        ["none", "none", "none", "none", "none", "none", "none", "none"],
        ["none", "none", "none", "none", "none", "none", "none", "none"],
        ["none", "none", "none", "none", "none", "none", "none", "none"],
        ["whiteP", "whiteP", "whiteP", "whiteP", "whiteP", "whiteP", "whiteP", "whiteP"],
        ["whiteR", "whiteN", "whiteB", "whiteQ", "whiteK", "whiteB", "whiteN", "whiteR"]
    ];
}


function swapValueArray(chessBoard, X, Y, TX , TY) {
    const temp = chessBoard[X][Y];
    chessBoard[X][Y] = chessBoard[TX][TY]
    chessBoard[TX][TY] = temp;
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


// Export the function
module.exports = {
    legalMove,
    resetGameArray,
    swapValueArray
};