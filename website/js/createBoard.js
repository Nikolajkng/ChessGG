// Fetch the div where the board is:
let myDiv = document.getElementById("board");
let cellSize = 100;

// Build the board of buttons:
const size = 8;
for (let x = 1; x <= size; x++) {
    for (let y = 1; y <= size; y++) {
        let coord = "("+x+", "+y+")";
        let newButton = document.createElement('BUTTON');
        let newText = document.createTextNode(coord);
        styleButtons(newButton, newText);
        newButton.addEventListener('click', () => {
            console.log('clicked on ' + coord);
        })
        document.querySelector('body').appendChild(newButton);
        
        myDiv.appendChild(newButton);
    }
}

// Style of buttons:
function styleButtons(newButton, newText){
    newButton.appendChild(newText);
    newButton.style.width = cellSize+"px";
    newButton.style.height = cellSize+"px";
    newButton.style.padding = 0+"px";
    newButton.style.margin = 0+"px";
}

