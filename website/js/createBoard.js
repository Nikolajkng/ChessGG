// Fetch the div where the board is:
let myDiv = document.getElementById("board");

// Build the board of buttons:
const size = 8;
for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
        let newButton = document.createElement('button');
        let newText = document.createTextNode("button: ("+x+", "+y+")" );
        newButton.appendChild(newText);
        myDiv.appendChild(newButton);
    }
}