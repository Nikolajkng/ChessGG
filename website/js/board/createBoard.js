// The board style design:
const designPattern = (x, y, btn) => {
    if (y % 2 == 0 && x % 2 == 0) {
        btn.setAttribute("cellColor", "white-color");
        btn.style.cssText = "" +
            "background-color: white;" +
            "border: 2px;"
    }
    else if (y % 2 != 0 && x % 2 != 0) {
        btn.setAttribute("cellColor", "white-color");
        btn.style.cssText = "" +
            "background-color: white;" +
            "border: 2px;" 
    } else {
        btn.setAttribute("cellColor", "lightblue-color");
        btn.style.cssText = "" +
        "background-color: lightblue;" +
        "border: 2px;"
    }
};

// Build the board of 8x8 buttons as cells:
const boardSize = 8;
for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
        let btn = document.createElement('button');
        btn.setAttribute("id", 'button(' + x + "," + y + ")"); // id = 'button(x,y)'
        btn.setAttribute("x", x);
        btn.setAttribute("y", y);
        designPattern(x, y, btn);
        setInitialPieceValues(btn, x, y);
        setInitialPieces(btn)
        setCellSize(btn);
        onClick(btn, x, y);
        document.querySelector('body').appendChild(btn);
        document.getElementById("chessBoard").appendChild(btn);
    }
}
