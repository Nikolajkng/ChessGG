// Fetch the div where the board is:
let myDiv = document.getElementById("board");

// Build the board of 8x8 buttons as cells:
const size = 8;
for (let x = 1; x <= size; x++) {
    for (let y = 1; y <= size; y++) {
        let coord = "("+x+", "+y+")";
        let btn = document.createElement('button');
        setInitialPieceValues(btn, x, y);
        setInitialPieces(btn)
        setCellSize(btn);
        onClick(btn, coord);
        
        document.querySelector('body').appendChild(btn);
        myDiv.appendChild(btn);
    }
}



