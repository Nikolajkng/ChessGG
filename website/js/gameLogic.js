let firstSelection = "yes";
let clickCount = 0;
let selectedPos = "";

const selectedCell = (btn, x, y) => {
    
    // Ensures one selection at a time
    if (firstSelection == "yes") {
        btn.setAttribute('selected', 'yes')
        selectedPos = x + "" + y;
        btn.classList.add('highlight');
        clickCount++;
        firstSelection = "no";
    } 
    // Remove selection when clicking on selected cell again
    else if (clickCount > 0 && selectedPos == (x + "" + y)) {
        btn.classList.remove('highlight');
        clickCount = 0;
        firstSelection = "yes";

    }


}


// Onclick function of buttons:
const onClick = (btn, x, y) => {
    btn.addEventListener('click', () => {

        // Selection logic:
        selectedCell(btn, x, y);

        // Move piece logic (TODO):


        // Remove piece logic (TODO):


        // Info for debug:
        console.log('Class: ' + btn.className);
        console.log('Coordinates: ' + "("+x+", "+y+")");
        console.log('Value: ' + btn.getAttribute("value"));
        console.log('Selected: ' + btn.getAttribute("selected"));
        console.log('ClickCount: ' + clickCount);
        console.log("|---------------------|")
    })
}