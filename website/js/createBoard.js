// Fetch the div where the board is:
let myDiv = document.getElementById("board");
let cellSize = 100;




// Change value of cells after onClick
const changeValue = (btn, value) => {
    btn.setAttribute("id", value)
}

// Set value of cells on creation
const setValue = (btn) => {
    btn.setAttribute("id", "0");
    console.log(btn.getAttribute("id"));
}

// Onclick function of buttons:
const onClick = (newButton,coord) => {
    newButton.addEventListener('click', () => {
        console.log('clicked on ' + coord);

        // Value of cells:
        changeValue(newButton, "-1");
        console.log(newButton.getAttribute("id"))
    })
}

// Style of buttons:
const styleCells = (newButton, newText) => {
    newButton.appendChild(newText);
    newButton.style.width = cellSize+"px";
    newButton.style.height = cellSize+"px";
    newButton.style.padding = 0+"px";
    newButton.style.margin = 0+"px";
    console.log("Stuff")
}

// Build the board of 8x8 buttons as cells:
const size = 8;
for (let x = 1; x <= size; x++) {
    for (let y = 1; y <= size; y++) {
        let coord = "("+x+", "+y+")";
        let newButton = document.createElement('button');
        let newLabel = document.createTextNode(coord);
        
        setValue(newButton);
        styleCells(newButton, newLabel);
        onClick(newButton, coord);
        
        document.querySelector('body').appendChild(newButton);
        myDiv.appendChild(newButton);
    }
}



