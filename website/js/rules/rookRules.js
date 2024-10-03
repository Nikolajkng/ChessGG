const rookRules = (mySelectBtn, targetBtn) => {

    // Relative Positions and info:
    const x = parseInt(mySelectBtn.getAttribute("x"));
    const y = parseInt(mySelectBtn.getAttribute("y"));

    const tX = parseInt(targetBtn.getAttribute("x"));
    const tY = parseInt(targetBtn.getAttribute("y"));


    if (tX - x !== 0) { // har rykket vandret 
        for (let j = minY + 1; j < maxY; j++) {
            if (chessBoard[x][j] !== "none") {
                return false; // Something is blocking the rook's path

            } else if (tY - y !== 0) { // har rykket lodret

            } else {
                return false //har rykket diagonalt
            }
        }
    }

    for (let i = x; i < tX; i++) { // tjekker vandret
        if (chessBoard[i][y] === "none") {
            return true;
        } else {
            return false;
        }
    }

    for (let j = y; j > tY; j++) { // tjekker lodret
        if (chessBoard[j][y] === "none") {
            return true;
        } else {
            return false;
        }
    }

    /*
    let chessBoard = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
]; 



man skal tænke på, at den kun kan rykke i array
  der må ikke være noget i vejen, den må ikke springe noget om  
  myselect og target skal bruges.
    */

}