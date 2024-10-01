// 8x8 data game board that contains each button object
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

// Build the board of 8x8 buttons as cells:
const boardSize = 8;
for (let x = 1; x <= boardSize; x++) {
    for (let y = 1; y <= boardSize; y++) {
        let btn = document.createElement('button');
        btn.setAttribute("id", 'button('+x+","+y+")");   // id = 'button(x,y)'
        btn.setAttribute("x",x);
        btn.setAttribute("y",y);
        setInitialPieceValues(btn, x, y);
        setInitialPieces(btn)
        setCellSize(btn);
        onClick(btn, x, y);
        
        document.querySelector('body').appendChild(btn);
        document.getElementById("chessBoard").appendChild(btn);
    }
}
console.log(chessBoard);



