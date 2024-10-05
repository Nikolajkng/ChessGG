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



// The function
const legalMove = (sX, sY, tX, tY, sValue, tValue, turn) => {
    //const targetValue = sBtn.getAttribute("value");
    const selectValue = sValue;

    // Filter which piece has been selected -> applies correct rule for specific piece-type: 
    if (selectValue.includes("P")) {
        return pawnRules(sX, sY, tX, tY, chessBoard, turn, sValue, tValue);
        } else if (selectValue.includes("N")) {
            return knightRules(sX, sY, tX, tY, chessBoard, turn);
        } else if (selectValue.includes("B")) {
            return bishopRules(sX, sY, tX, tY, chessBoard, turn, sValue, tValue);
        } else if (selectValue.includes("R")) {
            return rookRules(sX, sY, tX, tY, chessBoard, turn);
        } else if (selectValue.includes("K")) {
            return kingRules(sX, sY, tX, tY, chessBoard, turn);
        } else if (selectValue.includes("Q")) {
            return queenRules(sX, sY, tX, tY, chessBoard, turn);
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

// Export the function
module.exports = {
    legalMove,
    resetGameArray
};