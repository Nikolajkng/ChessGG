let selected = true;
let selectedPos = "";

const selectedCell = (btn, x, y) => {
    cellType = btn.getAttribute('value');

    // Ensures one selection at a time on cells containing pieces only
    if (selected && cellType != 'none') {
        selectedPos = x + "" + y;
        btn.setAttribute('selected', 'yes')
        btn.classList.add('highlight');
        selected = false;
    } 
    // Remove selection only when clicking on same selected cell
    else if (!selected && selectedPos == (x + "" + y)) {
        btn.classList.remove('highlight');
        btn.setAttribute('selected', 'no');
        selected = true;

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
        console.log("|---------------------|")
    })
}