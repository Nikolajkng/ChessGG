// Fetch the div where the board is:
let board = document.getElementById("board");

// Build the board of 8x8 buttons as cells:
const size = 8;
var btnNo=0;
for (let x = 1; x <= size; x++) {
    for (let y = 1; y <= size; y++) {
        btnNo++;
        let btn = document.createElement('button');
        btn.className += 'button'+btnNo;
        setInitialPieceValues(btn, x, y);
        setInitialPieces(btn)
        setCellSize(btn);
        onClick(btn, x, y);
        
        document.querySelector('body').appendChild(btn);
        board.appendChild(btn);
    }
}



