let canSelect = true;
let selectedPos = "";
let selectedX = "";
let selectedY = "";
let playerTurn = 0;

const selectedCell = (btn, x, y) => {
    cellType = btn.getAttribute('value');

    // TODO:
    // for 2 player (Check who is playing, host or client, and correct the "include.white")


    // Ensures one selection at a time on cells containing pieces only
    if (canSelect && cellType != 'none' && (btn.getAttribute('value').includes('white'))) {
        selectedX = x;
        selectedY = y;
        selectedPos = selectedX + "" + selectedY;
        btn.setAttribute('selected', 'yes')
        btn.classList.add('highlight');
        canSelect = false;
    } 
    // Remove selection only when clicking on same selected cell
    else if (!canSelect && selectedPos == (x + "" + y)) {
        btn.classList.remove('highlight');
        btn.setAttribute('selected', 'no');
        canSelect = true;
    }
}

// Onclick function of buttons:
const onClick = (btn, x, y) => {
    btn.addEventListener('click', () => {

        // Selection logic:
        selectedCell(btn, x, y);

        // Move piece logic (TODO):
        movePiece(x, y);

        // Remove piece logic (TODO):


        // Info for debug:
        console.log('Class: ' + btn.className);
        console.log('Coordinates: ' + "("+x+", "+y+")");
        console.log('Value: ' + btn.getAttribute("value"));
        console.log('Selected: ' + btn.getAttribute("selected"));
        console.log("|---------------------|")
    })
}

// Move piece
const movePiece = (x, y) => {
    let mySelectPos = selectedX+""+selectedY;
    let newPos = x+""+y;
    
    let moveDetected = Math.abs(selectedX - x) != 0 || Math.abs(selectedY - y) != 0 
    if(moveDetected){
        playerTurn++;
        console.log("movement detected: " + playerTurn);
        console.log("#######################################################");
    } else {
        console.log("no movement detected");
        console.log("#######################################################");
    }
    
}
