const legalMove = (selectedBtn, targetBtn) => {

    if (selectedBtn != null) {

        const targetValue = targetBtn.getAttribute("value");
        const selectValue = selectedBtn.getAttribute("value");
        console.log("checking legal move for: " + selectValue);
        console.log("target move is: " + targetValue)

        if (selectValue.includes("P")) {
            return pawnRules(selectedBtn, targetBtn);
        } else if (selectValue.includes("N")) {
            return knightRules(selectedBtn, targetBtn);
        } else if (selectValue.includes("B")) {
            return bishopRules(selectedBtn, targetBtn);
        } else if (selectValue.includes("R")) {
            return rookRules(selectedBtn, targetBtn);
        } else if (selectValue.includes("K")) {
            return kingRules(selectedBtn, targetBtn);
        } else if (selectValue.includes("Q")) {
            return queenRules(selectedBtn, targetBtn);
        }

        return false;
    } else {
        // TO DO: add chess illegal move sound
        console.error("Error: Selectedbtn === null -> Cause: (1): not your turn, (2): not your pieces");
    }
}



// TO DO: 
const knightRules = (mySelectBtn, targetBtn) => {
    return true;
}
const bishopRules = (mySelectBtn, targetBtn) => {
    return true;
}
const rookRules = (mySelectBtn, targetBtn) => {
    return true;
}
const kingRules = (mySelectBtn, targetBtn) => {
    return true;
}
const queenRules = (mySelectBtn, targetBtn) => {
    return true;
}