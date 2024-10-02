
const syncPieceMovement = (sBtn, tBtn, sValue, tValue) => {
    removePieceTrail(sBtn);
    const newPieceFigure = document.createElement("span");
    newPieceFigure.style.cssText = " font-size:"+pieceSize+";"
    newPieceFigure.textContent = getPieceSymbol(sValue);
    tBtn.appendChild(newPieceFigure);

}