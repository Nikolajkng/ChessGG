function knightRules(x, y, tX, tY, chessBoard, turn, sValue, tValue) {
    const {
        swapValueArray
    } = require("./ruleChecker")

    const whitePieces = tValue.includes("white");
    const blackPieces = tValue.includes("black");
    const movePatternUp = tX === x - 2 && (tY === y + 1 || tY === y - 1)
    const movePatternDown = tX === x + 2 && (tY === y + 1 || tY === y - 1)
    const movePatternRight = tY === y + 2 && (tX === x + 1 || tX === y - 1)
    const movePatternLeft = tY === y - 2 && (tX === x + 1 || tX === x - 1)


    if (turn === "White") {
        const satisfyAllRulesWhite = !whitePieces && (movePatternUp || movePatternDown || movePatternRight || movePatternLeft);
        if (satisfyAllRulesWhite) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return true;
        }
    } else if (turn === "Black") {
        const satisfyAllRulesBlack = !blackPieces && (movePatternUp || movePatternDown || movePatternRight || movePatternLeft);
        if (satisfyAllRulesBlack) {
            swapValueArray(chessBoard, x, y, tX, tY)
            return true;
        }

    }


}

module.exports = {
    knightRules
}