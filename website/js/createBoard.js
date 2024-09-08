// Fetch the div where the board is:
let myDiv = document.getElementById("board");
let cellSize = 100;

// Build the board of buttons:
const size = 8;
for (let x = 1; x <= size; x++) {
    for (let y = 1; y <= size; y++) {
        let newButton = document.createElement('button');
        let newText = document.createTextNode("button: ("+x+", "+y+")" );
        newButton.appendChild(newText);
        newButton.style.width = cellSize+"px";
        newButton.style.height = cellSize+"px";
        newButton.style.padding = 0+"px";
        newButton.style.margin = 0+"px";
        myDiv.appendChild(newButton);
    }
}