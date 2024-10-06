let previousCell = null;
let selectedBtn = null;
let selectedX = -1;
let selectedY = -1;
let selectedID = "";
let selectedValue = "";
let canSelect = true;

const selectedCell = (sBtn, x, y) => {
    ////////////////////////////////////////// WHITE PLAYER SELECTION ////////////////////////////////////////// 
    const sValue = sBtn.getAttribute("value");
    if (playerTurn === "White") {
        if (canSelect && sValue.includes("white")) {
            selectedBtn = sBtn;
            selectedX = x;
            selectedY = y;
            selectedID = selectedBtn.setAttribute("id", sBtn.getAttribute("id"))
            selectedValue = sValue;
            highlightSelection(sBtn);
            canSelect = false;
            console.log("selected: " + sValue);
        }
        // Remove selection only by re-select same cell
        else if (!canSelect) {
            removeHighlight();
            selectedBtn = null;
        }
        ////////////////////////////////////////// BLACK PLAYER SELECTION ////////////////////////////////////////// 
    } else if (playerTurn === "Black") {
        const sValue = sBtn.getAttribute("value");
        if (canSelect && sValue.includes("black")) {
            selectedBtn = sBtn;
            selectedX = x;
            selectedY = y;
            selectedID = selectedBtn.setAttribute("id", sBtn.getAttribute("id"))
            selectedValue = sValue;
            selectedBtn.setAttribute("id", sBtn.getAttribute("id"))
            highlightSelection(sBtn);
            canSelect = false;
            console.log("selected: " + sValue);
        }
        // Remove selection only by re-select same cell
        else if (!canSelect) {
            removeHighlight();
            selectedBtn = null;
        }
    }
}



function highlightSelection(btn) {
    const x = btn.getAttribute("x");
    const y = btn.getAttribute("y");
    previousCell = document.getElementById("button(" + x + "," + y + ")");
    btn.style.backgroundColor = "red";
}


function removeHighlight() {
    if (selectedBtn != null) {
        if (previousCell.getAttribute("cellColor") === "white-color") {
            selectedBtn.style.backgroundColor = "white"
        } else if (previousCell.getAttribute("cellColor") === "lightblue-color") {
            selectedBtn.style.backgroundColor = "lightblue"
        }
        selectedBtn.setAttribute('selected', 'no');
        canSelect = true;
    }
}