
const syncPieceMovement = (sBtn, tBtn, sValue, tValue) => {
    
    // Remove piece from old position
    removePieceTrail(sBtn);

    // Place "correct" piece on target button:
    const newPieceFigure = document.createElement("span");
    newPieceFigure.style.cssText = " font-size:"+pieceSize+";"
    newPieceFigure.textContent = getPieceSymbol(sValue);
    tBtn.appendChild(newPieceFigure);

    // Data swap:
    swapPieceValue(sBtn, tBtn)

    // Switch player turn
    clickCount++;
    
}